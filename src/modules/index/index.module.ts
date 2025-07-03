// src/index/index.module.ts
import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from '@/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}
