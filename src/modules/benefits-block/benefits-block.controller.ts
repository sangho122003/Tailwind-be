import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express'; // ✅ thiếu
import { diskStorage } from 'multer'; // ✅ thiếu
import { extname } from 'path'; // ✅ thiếu
import { BenefitsBlockService } from './benefits-block.service';
// (các import khác giữ nguyên)

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
      throw new BadRequestException('Tối đa 4 hình ảnh!');
    }

    let parsedItems: { title: string; description: string }[];

    try {
      parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    } catch {
      throw new BadRequestException('`items` phải là JSON array string!');
    }

    if (parsedItems.length !== files.length) {
      throw new BadRequestException('Số lượng items không khớp với số ảnh!');
    }

    return this.benefitsBlockService.createBlockWithItems({
      title,
      pageId: +pageId,
      items: parsedItems,
      images: files,
    });
  }

  // ✅ GET /benefits-block/page/:pageId
  @Get('/page/:pageId')
  async findByPageId(@Param('pageId') pageId: string) {
    return this.benefitsBlockService.findByPageId(+pageId);
  }
}
