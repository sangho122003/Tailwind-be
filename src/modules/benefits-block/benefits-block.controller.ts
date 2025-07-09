// src/modules/benefits-block/benefits-block.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  BadRequestException,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BenefitsBlockService } from './benefits-block.service';
import { BENEFITS_MESSAGES } from '@/constants/message';

@Controller('benefits-block')
export class BenefitsBlockController {
  constructor(private readonly benefitsBlockService: BenefitsBlockService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './uploads/benefits',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const { title, pageId, items } = body;

    if (files.length > 4) {
      throw new BadRequestException(BENEFITS_MESSAGES.MAX_IMAGES_EXCEEDED);
    }

    let parsedItems: { title: string; description: string }[];

    try {
      parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    } catch {
      throw new BadRequestException(BENEFITS_MESSAGES.ITEMS_JSON_INVALID);
    }

    if (parsedItems.length !== files.length) {
      throw new BadRequestException(BENEFITS_MESSAGES.ITEMS_IMAGES_MISMATCH);
    }

    return this.benefitsBlockService.createBlockWithItems({
      title,
      pageId: +pageId,
      items: parsedItems,
      images: files,
    });
  }

  @Get('/page/:pageId')
  async findByPageId(@Param('pageId') pageId: string) {
    return this.benefitsBlockService.findByPageId(+pageId);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 4, {
      storage: diskStorage({
        destination: './uploads/benefits',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const { title, items } = body;

    let parsedItems: { title: string; description: string }[];

    try {
      parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    } catch {
      throw new BadRequestException(BENEFITS_MESSAGES.ITEMS_JSON_INVALID);
    }

    if (parsedItems.length !== files.length) {
      throw new BadRequestException(BENEFITS_MESSAGES.ITEMS_IMAGES_MISMATCH);
    }

    return this.benefitsBlockService.updateBlockWithItems(+id, {
      title,
      items: parsedItems,
      images: files,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.benefitsBlockService.removeBlock(+id);
  }
}
