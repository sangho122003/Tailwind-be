import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { AUTH_MESSAGES } from '@/constants/message';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ name, email, password: hashedPassword });
    return this.userRepo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    const isValid = user && (await bcrypt.compare(password, user.password));
    if (!isValid) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const payload = { sub: user.id, email: user.email };

    const access_token = this.jwtService.sign(payload, {
      secret: 'access-secret',
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: 'refresh-secret',
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'refresh-secret',
      });

      const access_token = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { secret: 'access-secret', expiresIn: '15m' },
      );

      return { access_token };
    } catch {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }
  }

  async getMe(userPayload: { sub: number; email: string }) {
    if (!userPayload?.sub) {
      throw new UnauthorizedException(AUTH_MESSAGES.MISSING_TOKEN_PAYLOAD);
    }

    const user = await this.userRepo.findOne({ where: { id: userPayload.sub } });
    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.USER_NOT_FOUND);
    }

    return { name: user.name };
  }
}
