import { Module } from '@nestjs/common';
import { BenefitsBlockService } from './benefits-block.service';
import { BenefitsBlockController } from './benefits-block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenefitsBlock } from '@/entities/benefits-block.entity';
import { BenefitItem } from '@/entities/benefit-item.entity';
import { Page } from '@/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BenefitsBlock, BenefitItem, Page])],
  controllers: [BenefitsBlockController],
  providers: [BenefitsBlockService],
})
export class BenefitsBlockModule {}
