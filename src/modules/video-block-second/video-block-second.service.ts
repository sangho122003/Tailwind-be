import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoBlockSecond } from '@/entities/video-block-second.entity';
import { Page } from '@/entities/page.entity';
import { CreateVideoBlockSecondDto } from './dto/create-video-block-second.dto';
import { UpdateVideoBlockSecondDto } from './dto/update-video-block-second.dto';
import { ERORR } from '@/constants/message';

@Injectable()
export class VideoBlockSecondService {
  constructor(
    @InjectRepository(VideoBlockSecond)
    private readonly videoRepo: Repository<VideoBlockSecond>,

    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ) { }

  private transformYoutubeUrl(url: string): string {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }
  async findByPage(pageId: number) {
    const page = await this.pageRepo.findOneBy({ id: pageId });
    if (!page) throw new Error(ERORR.PAGE_NOT_FOUND);

    return this.videoRepo.find({
      where: { page: { id: pageId } },
      relations: ['page'],
    });   
  }

  async create(dto: CreateVideoBlockSecondDto) {
    const page = await this.pageRepo.findOneBy({ id: dto.ID_page });
    if (!page) throw new Error(ERORR.PAGE_NOT_FOUND);

    const newBlock = this.videoRepo.create({
      url: this.transformYoutubeUrl(dto.url),
      page,
    });

    return this.videoRepo.save(newBlock);
  }
  async update(id: number, dto: UpdateVideoBlockSecondDto) {
    const block = await this.videoRepo.findOne({ where: { id }, relations: ['page'] });
    if (!block) throw new Error(ERORR.PAGE_NOT_FOUND);

    if (dto.url) {
      dto.url = this.transformYoutubeUrl(dto.url);
    }

    if (dto.ID_page) {
      const newPage = await this.pageRepo.findOneBy({ id: dto.ID_page });
      if (!newPage) throw new Error(ERORR.PAGE_NOT_FOUND);
      block.page = newPage;
    }

    Object.assign(block, dto);
    return this.videoRepo.save(block);
  }

  async remove(id: number) {
    const block = await this.videoRepo.findOneBy({ id });
    if (!block) return null;
    return this.videoRepo.remove(block);
  }
}
