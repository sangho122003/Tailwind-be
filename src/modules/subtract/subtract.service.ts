import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtract } from '@/entities/subtract.entity';
import { Page } from '@/entities/page.entity';
import { Repository } from 'typeorm';
import { CreateSubtractDto } from './dto/create-subtract.dto';
import { UpdateSubtractDto } from './dto/update-subtract.dto';

@Injectable()
export class SubtractService {
  constructor(
    @InjectRepository(Subtract)
    private readonly subtractRepo: Repository<Subtract>,

    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ) { }

  async create(dto: CreateSubtractDto, file: Express.Multer.File) {
    const page = await this.pageRepo.findOneBy({ id: dto.pageId });
    if (!page) throw new NotFoundException('Page not found');

    const subtract = this.subtractRepo.create({
      image: file.filename,
      title: dto.title,
      dis: dto.dis,
      page,
    });

    return this.subtractRepo.save(subtract);
  }
  async findByPage(pageId: number) {
    const page = await this.pageRepo.findOneBy({ id: pageId });
    if (!page) throw new NotFoundException(`Page with ID ${pageId} not found`);

    return this.subtractRepo.find({
      where: { page: { id: pageId } },
      relations: ['page'],
    });
  }

  findAll() {
    return this.subtractRepo.find({ relations: ['page'] });
  }

  async findOne(id: number) {
    const subtract = await this.subtractRepo.findOne({ where: { id }, relations: ['page'] });
    if (!subtract) throw new NotFoundException('Not found');
    return subtract;
  }

  async update(id: number, dto: UpdateSubtractDto, file?: Express.Multer.File) {
    const subtract = await this.subtractRepo.findOne({ where: { id }, relations: ['page'] });
    if (!subtract) throw new NotFoundException('Not found');

    if (file) subtract.image = file.filename;
    if (dto.title !== undefined) subtract.title = dto.title;
    if (dto.dis !== undefined) subtract.dis = dto.dis;

    if (dto.pageId) {
      const page = await this.pageRepo.findOneBy({ id: dto.pageId });
      if (!page) throw new NotFoundException('Page not found');
      subtract.page = page;
    }

    return this.subtractRepo.save(subtract);
  }

  async remove(id: number) {
    const subtract = await this.subtractRepo.findOneBy({ id });
    if (!subtract) throw new NotFoundException('Not found');
    return this.subtractRepo.remove(subtract);
  }
}
