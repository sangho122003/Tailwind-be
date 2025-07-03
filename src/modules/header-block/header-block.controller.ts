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
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateHeaderBlockDto } from './dto/create-header-block.dto';
import { UpdateHeaderBlockDto } from './dto/update-header-block.dto';
import { HeaderBlockService } from './header-block.service';

@ApiTags('HeaderBlock')
@Controller('header-block')
export class HeaderBlockController {
  constructor(private readonly headerBlockService: HeaderBlockService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/header-blocks',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string' },
        title2: { type: 'string' },
        ID_page: { type: 'number' },
      },
    },
  })
  @ApiOperation({ summary: 'Tạo HeaderBlock kèm ảnh' })
  create(
    @Body() dto: CreateHeaderBlockDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.headerBlockService.create(dto, file?.filename);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả HeaderBlocks' })
  findAll() {
    return this.headerBlockService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy HeaderBlock theo ID' })
  @ApiParam({ name: 'id', required: true })
  findOne(@Param('id') id: string) {
    return this.headerBlockService.findOne(+id);
  }

  @Get('/page/:pageId')
  @ApiOperation({ summary: 'Lấy HeaderBlock theo Page ID' })
  @ApiParam({ name: 'pageId', required: true })
  findByPage(@Param('pageId') pageId: string) {
    return this.headerBlockService.findByPageId(+pageId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật HeaderBlock' })
  update(@Param('id') id: string, @Body() dto: UpdateHeaderBlockDto) {
    return this.headerBlockService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá HeaderBlock' })
  remove(@Param('id') id: string) {
    return this.headerBlockService.remove(+id);
  }
}
