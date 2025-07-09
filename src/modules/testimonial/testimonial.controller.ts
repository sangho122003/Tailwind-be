import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TestimonialBlock')
@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) { }

  @Post()
  create(@Body() dto: CreateTestimonialDto) {
    return this.testimonialService.create(dto);
  }
  @Get('page/:pageId')
  findByPage(@Param('pageId') pageId: string) {
    return this.testimonialService.findByPage(+pageId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTestimonialDto) {
    return this.testimonialService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testimonialService.remove(+id);
  }
}
