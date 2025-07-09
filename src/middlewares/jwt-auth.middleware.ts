import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ERORR } from '@/constants/message';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(ERORR.MISSING_OR_INVALID);
    }
    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, {secret: 'access-secret'});
      req['user'] = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException(ERORR.INVALID_OR_EXPRIRED);
    }
  }
}