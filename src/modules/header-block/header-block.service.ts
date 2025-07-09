import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeaderBlock } from '@/entities/header-block.entity';
import { Page } from '@/entities/page.entity';
import { CreateHeaderBlockDto } from './dto/create-header-block.dto';
import { UpdateHeaderBlockDto } from './dto/update-header-block.dto';
import { ERORR } from '@/constants/message';

@Injectable()
export class HeaderBlockService {
  constructor(
    @InjectRepository(HeaderBlock)
    private readonly headerRepo: Repository<HeaderBlock>,
    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ) {}

  async create(dto: CreateHeaderBlockDto, imageName: string) {
    const page = await this.pageRepo.findOneBy({ id: dto.ID_page });
    if (!page) throw new NotFoundException(ERORR.PAGE_NOT_FOUND);

    const block = this.headerRepo.create({
      ...dto,
      image: '/uploads/header-blocks/' + imageName,
      page,
    });

    return this.headerRepo.save(block);
  }

  async findByPageId(pageId: number) {
    const page = await this.pageRepo.findOneBy({ id: pageId });
    if (!page) throw new NotFoundException(ERORR.PAGE_NOT_FOUND);

    return this.headerRepo.find({
      where: { page: { id: pageId } },
      relations: ['page'],
    });
  }

  async update(id: number, dto: UpdateHeaderBlockDto, imageName?: string) {
    const block = await this.headerRepo.findOne({
      where: { id },
      relations: ['page'],
    });
    if (!block) throw new NotFoundException(ERORR.HEADEBLOCK_NOT_FOUND);

    if (dto.ID_page) {
      const page = await this.pageRepo.findOneBy({ id: dto.ID_page });
      if (!page) throw new NotFoundException(ERORR.PAGE_NOT_FOUND);
      block.page = page;
    }

    if (imageName) {
      block.image = '/uploads/header-blocks/' + imageName;
    }

    Object.assign(block, dto);
    return this.headerRepo.save(block);
  }

  async remove(id: number) {
    const block = await this.headerRepo.findOneBy({ id });
    if (!block) throw new NotFoundException(ERORR.HEADEBLOCK_NOT_FOUND);

    return this.headerRepo.remove(block);
  }
}
