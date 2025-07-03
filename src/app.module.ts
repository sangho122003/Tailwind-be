import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthMiddleware } from './middlewares/jwt-auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { HeaderBlockModule } from './modules/header-block/header-block.module';
import { PageModule } from './modules/page/page.module';
import { SubtractModule } from './modules/subtract/subtract.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { VideoBlockSecondModule } from './modules/video-block-second/video-block-second.module';
import { VideoBlockModule } from './modules/video-block/video-block.module';
import { ValueBlockModule } from './modules/value-block/value-block.module';
import { BenefitsBlockModule } from './modules/benefits-block/benefits-block.module';
import { IndexModule } from './modules/index/index.module';
import { AuthModule } from './modules/auth/auth.module';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    JwtModule.register({
      secret: 'access-secret',
      signOptions: { expiresIn: '15m' },
    }),
    UserModule,
    HeaderBlockModule,
    PageModule,
    SubtractModule,
    TestimonialModule,
    VideoBlockSecondModule,
    VideoBlockModule,
    ValueBlockModule,
    BenefitsBlockModule,
    IndexModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: 'auth/Login', method: RequestMethod.ALL },
        { path: 'auth/register', method: RequestMethod.ALL },
        { path: 'auth/refresh', method: RequestMethod.ALL },
        { path: 'index/:pageId', method: RequestMethod.GET }
      )
      .forRoutes('*');  
  }
}
