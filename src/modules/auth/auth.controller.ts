import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AUTH_MESSAGES } from '@/constants/message';

interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
  user?: { sub: number; email: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: CreateUserDto) {
    const { name, email, password } = body;
    return this.authService.register(name, email, password);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.login(
      body.email,
      body.password,
    );

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { access_token };
  }

  @Post('refresh')
  refresh(@Req() req: RequestWithCookies) {
    const refreshToken = req.cookies?.['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException(AUTH_MESSAGES.NO_REFRESH_TOKEN);
    }

    return this.authService.refreshToken(refreshToken);
  }

  @Get('me')
  getProfile(@Req() req: RequestWithCookies) {
    const user = req.user;
    if (!user?.sub) {
      throw new UnauthorizedException(AUTH_MESSAGES.USER_NOT_FOUND);
    }

    return this.authService.getMe(user);
  }
}
