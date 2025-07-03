
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from '@/entities/page.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ) { }

  async getFullPageDataByName(name: string) {
    const page = await this.pageRepo.findOne({
      where: { name: name.trim().toLowerCase() },
    });
    if (!page) throw new NotFoundException('Page not found');
    const pageId = page.id;
    const [headerBlocks, valueBlocks, benefitsBlocks, videoBlocks, videoBlockSeconds, testimonialBlocks] =
      await Promise.all([
        this.pageRepo.manager.find('HeaderBlock', { where: { page: { id: pageId } } }),
        this.pageRepo.manager.find('ValueBlock', { where: { page: { id: pageId } } }),
        this.pageRepo.manager.find('BenefitsBlock', { where: { page: { id: pageId }, }, relations: ['items']  }),
        this.pageRepo.manager.find('VideoBlock', { where: { page: { id: pageId } } }),
        this.pageRepo.manager.find('VideoBlockSecond', { where: { page: { id: pageId } } }),
        this.pageRepo.manager.find('TestimonialBlock', { where: { page: { id: pageId } } }),
      ]);
      
    return {
      page,
      headerBlocks,
      valueBlocks,
      benefitsBlocks,
      videoBlocks,
      videoBlockSeconds,
      testimonialBlocks,
    };
  }
}
