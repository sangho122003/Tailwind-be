import { Module } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialController } from './testimonial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialBlock } from '@/entities/testimonial-block.entity';
import { Page } from '@/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestimonialBlock, Page])],
  controllers: [TestimonialController],
  providers: [TestimonialService],
})
export class TestimonialModule {}
