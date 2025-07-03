import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeaderBlock } from '@/entities/header-block.entity';
import { Page } from '@/entities/page.entity';
import { CreateHeaderBlockDto } from './dto/create-header-block.dto';
import { UpdateHeaderBlockDto } from './dto/update-header-block.dto';

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
    if (!page) throw new NotFoundException('Page not found');

    const block = this.headerRepo.create({
      ...dto,
      image: "/uploads/header-blocks/" + imageName,
      page,
    });

    return this.headerRepo.save(block);
  }

  findAll() {
    return this.headerRepo.find({ relations: ['page'] });
  }

  findOne(id: number) {
    return this.headerRepo.findOne({ where: { id }, relations: ['page'] });
  }

  async findByPageId(pageId: number) {
    const page = await this.pageRepo.findOneBy({ id: pageId });
    if (!page) throw new NotFoundException('Page not found');

    return this.headerRepo.find({
      where: { page: { id: pageId } },
      relations: ['page'],
    });
  }

  async update(id: number, dto: UpdateHeaderBlockDto) {
    const block = await this.headerRepo.findOneBy({ id });
    if (!block) throw new NotFoundException('HeaderBlock not found');
    if (dto.ID_page) {
      const page = await this.pageRepo.findOneBy({ id: dto.ID_page });
      if (!page) throw new NotFoundException('Page not found');
      block.page = page;
    }
    Object.assign(block, dto);
    return this.headerRepo.save(block);
  }

  async remove(id: number) {
    const block = await this.headerRepo.findOneBy({ id });
    if (!block) throw new NotFoundException('HeaderBlock not found');

    return this.headerRepo.remove(block);
  }
}
