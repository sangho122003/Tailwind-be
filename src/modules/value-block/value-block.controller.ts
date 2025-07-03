import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ValueBlockService } from './value-block.service';
import { CreateValueBlockDto } from './dto/create-value-block.dto';
import { UpdateValueBlockDto } from './dto/update-value-block.dto';

@Controller('value-block')
export class ValueBlockController {
  constructor(private readonly valueBlockService: ValueBlockService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/value-blocks',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() body: CreateValueBlockDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.valueBlockService.create(body, file);
  }

  @Get()
  findAll() {
    return this.valueBlockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valueBlockService.findOne(+id);
  }

  @Get('/page/:pageId')
  getByPage(@Param('pageId') pageId: string) {
    return this.valueBlockService.findByPageId(+pageId);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/value-blocks',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() body: UpdateValueBlockDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.valueBlockService.update(+id, body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valueBlockService.remove(+id);
  }
}
