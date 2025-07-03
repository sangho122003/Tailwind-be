import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
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

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { secret: 'access-secret', expiresIn: '15m' },
      );

      return { access_token: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getMe(userPayload: { sub: number; email: string }) {
    if (!userPayload?.sub) throw new UnauthorizedException('Missing token payload');

    const user = await this.userRepo.findOne({ where: { id: userPayload.sub } });
    if (!user) throw new UnauthorizedException('User not found');

    return { name: user.name };
  }
}
