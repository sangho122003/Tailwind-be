import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoBlock } from '@/entities/video-block.entity';
import { CreateVideoBlockDto } from './dto/create-video-block.dto';
import { UpdateVideoBlockDto } from './dto/update-video-block.dto';
import { Page } from '@/entities/page.entity';
import { ERORR } from '@/constants/message';

@Injectable()
export class VideoBlockService {
  constructor(
    @InjectRepository(VideoBlock)
    private readonly videoRepo: Repository<VideoBlock>,
    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ) {}

  private transformYoutubeUrl(url: string): string {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }

  async create(dto: CreateVideoBlockDto) {
    const page = await this.pageRepo.findOneBy({ id: dto.ID_page });
    if (!page) throw new NotFoundException(ERORR.PAGE_NOT_FOUND);

    const newBlock = this.videoRepo.create({
      urlvideo: this.transformYoutubeUrl(dto.urlvideo),
      title: dto.title,
      dis: dto.dis,
      page,
    });

    return this.videoRepo.save(newBlock);
  }

  async findByPageId(pageId: number) {
    const page = await this.pageRepo.findOneBy({ id: pageId });
    if (!page) throw new NotFoundException('Page not found');

    return this.videoRepo.find({
      where: { page: { id: pageId } },
      relations: ['page'],
    });
  }

  async update(id: number, dto: UpdateVideoBlockDto) {
    const block = await this.videoRepo.findOne({ where: { id }, relations: ['page'] });
    if (!block) throw new NotFoundException('VideoBlock not found');

    if (dto.urlvideo) {
      dto.urlvideo = this.transformYoutubeUrl(dto.urlvideo);
    }

    if (dto.ID_page) {
      const page = await this.pageRepo.findOneBy({ id: dto.ID_page });
      if (!page) throw new NotFoundException('Page not found');
      block.page = page;
    }

    Object.assign(block, dto);
    return this.videoRepo.save(block);
  }

  async remove(id: number) {
    const block = await this.videoRepo.findOneBy({ id });
    if (!block) throw new NotFoundException('VideoBlock not found');
    return this.videoRepo.remove(block);
  }
}
