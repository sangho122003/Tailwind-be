import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideoBlockService } from './video-block.service';
import { CreateVideoBlockDto } from './dto/create-video-block.dto';
import { UpdateVideoBlockDto } from './dto/update-video-block.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('VideoBlock')
@Controller('video-block')
export class VideoBlockController {
  constructor(private readonly videoBlockService: VideoBlockService) {}

  @Post()
  create(@Body() dto: CreateVideoBlockDto) {
    return this.videoBlockService.create(dto);
  }

  @Get('page/:pageId')
  findByPage(@Param('pageId') pageId: string) {
    return this.videoBlockService.findByPageId(+pageId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVideoBlockDto) {
    return this.videoBlockService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoBlockService.remove(+id);
  }
}
