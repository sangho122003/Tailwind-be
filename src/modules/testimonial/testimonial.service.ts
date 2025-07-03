import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestimonialBlock } from '@/entities/testimonial-block.entity';
import { Page } from '@/entities/page.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(TestimonialBlock)
    private readonly testimonialRepo: Repository<TestimonialBlock>,

    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,
  ) { }

  async create(dto: CreateTestimonialDto) {
    const page = await this.pageRepo.findOneBy({ id: dto.ID_page });
    if (!page) throw new Error('Page not found');

    const testimonial = this.testimonialRepo.create({
      title: dto.title,
      dis: dto.dis,
      page,
    });

    return this.testimonialRepo.save(testimonial);
  }

  findAll() {
    return this.testimonialRepo.find({ relations: ['page'] });
  }
  async findByPage(pageId: number) {
    const page = await this.pageRepo.findOneBy({ id: pageId });
    if (!page) throw new Error(`Page with ID ${pageId} not found`);

    return this.testimonialRepo.find({
      where: { page: { id: pageId } },
      relations: ['page'],
    });
  }

  findOne(id: number) {
    return this.testimonialRepo.findOne({ where: { id }, relations: ['page'] });
  }

  async update(id: number, dto: UpdateTestimonialDto) {
    const testimonial = await this.testimonialRepo.findOne({ where: { id }, relations: ['page'] });
    if (!testimonial) throw new Error('Testimonial not found');

    if (dto.ID_page) {
      const newPage = await this.pageRepo.findOneBy({ id: dto.ID_page });
      if (!newPage) throw new Error('New Page not found');
      testimonial.page = newPage;
    }

    Object.assign(testimonial, dto);
    return this.testimonialRepo.save(testimonial);
  }

  async remove(id: number) {
    const testimonial = await this.testimonialRepo.findOneBy({ id });
    if (!testimonial) return null;
    return this.testimonialRepo.remove(testimonial);
  }
}
