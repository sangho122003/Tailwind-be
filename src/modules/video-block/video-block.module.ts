import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoBlockService } from './video-block.service';
import { VideoBlockController } from './video-block.controller';
import { VideoBlock } from '@/entities/video-block.entity';
import { Page } from '@/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoBlock, Page])],
  controllers: [VideoBlockController],
  providers: [VideoBlockService],
})
export class VideoBlockModule {}
