import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValueBlock } from 'src/entities/value-block.entity';
import { Page } from 'src/entities/page.entity';
import { Repository } from 'typeorm';
import { CreateValueBlockDto } from './dto/create-value-block.dto';
import { UpdateValueBlockDto } from './dto/update-value-block.dto';
import { ERORR } from '@/constants/message';

@Injectable()
export class ValueBlockService {
  constructor(
    @InjectRepository(ValueBlock)
    private valueBlockRepo: Repository<ValueBlock>,

    @InjectRepository(Page)
    private pageRepo: Repository<Page>,
  ) { }

  async create(dto: CreateValueBlockDto, file: Express.Multer.File) {
    const page = await this.pageRepo.findOneBy({ id: dto.pageId });
    if (!page) {
      throw new NotFoundException(ERORR.PAGE_NOT_FOUND);
    }

    const newBlock = this.valueBlockRepo.create({
      image: '/uploads/value-blocks/' + file.filename,
      title: dto.title,
      subject: dto.subject,
      page,
    });

    return this.valueBlockRepo.save(newBlock);
  }
  async update(id: number, dto: UpdateValueBlockDto, file?: Express.Multer.File) {
    const block = await this.valueBlockRepo.findOneBy({ id });
    if (!block) {
      throw new NotFoundException(ERORR.PAGE_NOT_FOUND);
    }

    if (file) block.image = '/uploads/value-blocks/' + file.filename;
    if (dto.title !== undefined) block.title = dto.title;
    if (dto.subject !== undefined) block.subject = dto.subject;

    if (dto.pageId !== undefined) {
      const page = await this.pageRepo.findOneBy({ id: dto.pageId });
      if (!page) {
        throw new NotFoundException(ERORR.PAGE_NOT_FOUND);
      }
      block.page = page;
    }

    return this.valueBlockRepo.save(block);
  }

  async findByPageId(pageId: number) {
    const page = await this.pageRepo.findOneBy({ id: pageId });
    if (!page) {
      throw new NotFoundException(ERORR.PAGE_NOT_FOUND);
    }

    const blocks = await this.valueBlockRepo.find({
      where: { page: { id: pageId } }, 
    });

    return blocks;
  }


  async remove(id: number) {
    const result = await this.valueBlockRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(ERORR.PAGE_NOT_FOUND);
    }
    return { message: `Deleted ValueBlock with ID ${id}` };
  }
}
