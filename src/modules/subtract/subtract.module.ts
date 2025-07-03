import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtract } from '@/entities/subtract.entity';
import { Page } from '@/entities/page.entity';
import { SubtractService } from './subtract.service';
import { SubtractController } from './subtract.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subtract, Page])],
  controllers: [SubtractController],
  providers: [SubtractService],
})
export class SubtractModule {}
