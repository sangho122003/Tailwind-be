import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoBlockSecond } from '@/entities/video-block-second.entity';
import { Page } from '@/entities/page.entity';
import { VideoBlockSecondService } from './video-block-second.service';
import { VideoBlockSecondController } from './video-block-second.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VideoBlockSecond, Page])],
  controllers: [VideoBlockSecondController],
  providers: [VideoBlockSecondService],
})
export class VideoBlockSecondModule {}
