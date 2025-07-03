import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderBlockService } from './header-block.service';
import { HeaderBlockController } from './header-block.controller';
import { HeaderBlock } from '@/entities/header-block.entity';
import { Page } from '@/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeaderBlock, Page])],
  controllers: [HeaderBlockController],
  providers: [HeaderBlockService],
})
export class HeaderBlockModule {}
