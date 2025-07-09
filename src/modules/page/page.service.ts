import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '@/entities/page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ERORR } from '@/constants/message';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const page = this.pageRepository.create(createPageDto);
    return this.pageRepository.save(page);
  }

  async findAll() {
    return this.pageRepository.find({
      relations: [
        'headerBlocks',
        'valueBlocks',
        'benefitsBlocks',
        'subtracts',
        'videoBlocks',
        'videoBlockSeconds',
        'testimonialBlocks',
      ],
    });
  }

  async findOne(id: number) {
    const page = await this.pageRepository.findOne({
      where: { id },
      relations: [
        'headerBlocks',
        'valueBlocks',
        'benefitsBlocks',
        'subtracts',
        'videoBlocks',
        'videoBlockSeconds',
        'testimonialBlocks',
      ],
    });

    if (!page) {
      throw new NotFoundException(ERORR.PAGE_NOT_FOUND);
    }

    return page;
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    await this.pageRepository.update(id, updatePageDto);
    return this.findOne(id); 
  }

  async remove(id: number) {
    const page = await this.pageRepository.findOneBy({ id });
    if (!page) {
      throw new NotFoundException(ERORR.PAGE_NOT_FOUND);
    }
    return this.pageRepository.remove(page);
  }
}
