import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoBlockSecondService } from './video-block-second.service';
import { CreateVideoBlockSecondDto } from './dto/create-video-block-second.dto';
import { UpdateVideoBlockSecondDto } from './dto/update-video-block-second.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('VideoBlockSecond')
@Controller('video-block-second')
export class VideoBlockSecondController {
  constructor(private readonly videoBlockSecondService: VideoBlockSecondService) { }

  @Post()
  create(@Body() dto: CreateVideoBlockSecondDto) {
    return this.videoBlockSecondService.create(dto);
  }


  @Get('page/:pageId')
  findByPage(@Param('pageId') pageId: string) {
    return this.videoBlockSecondService.findByPage(+pageId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVideoBlockSecondDto) {
    return this.videoBlockSecondService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoBlockSecondService.remove(+id);
  }
}
