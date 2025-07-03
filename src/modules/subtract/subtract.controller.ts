import {
  Controller, Post, Get, Patch, Delete, Param, Body,
  UseInterceptors, UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SubtractService } from './subtract.service';
import { CreateSubtractDto } from './dto/create-subtract.dto';
import { UpdateSubtractDto } from './dto/update-subtract.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Subtract')
@Controller('subtract')
export class SubtractController {
  constructor(private readonly subtractService: SubtractService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/subtracts',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + extname(file.originalname));
      },
    }),
  }))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        pageId: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Title' },
        dis: { type: 'string', example: 'Description' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  create(
    @Body() body: CreateSubtractDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File image is required');
    return this.subtractService.create(body, file);
  }

  @Get()
  findAll() {
    return this.subtractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtractService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/subtracts',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + extname(file.originalname));
      },
    }),
  }))
  update(
    @Param('id') id: string,
    @Body() body: UpdateSubtractDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.subtractService.update(+id, body, file);
  }
  @Get('page/:pageId')
  getByPage(@Param('pageId') pageId: string) {
    return this.subtractService.findByPage(+pageId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtractService.remove(+id);
  }
}
