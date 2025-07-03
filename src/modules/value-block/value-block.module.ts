  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ValueBlockController } from './value-block.controller';
  import { ValueBlockService } from './value-block.service';
  import { ValueBlock } from '@/entities/value-block.entity';
  import { Page } from '@/entities/page.entity';

  @Module({
    imports: [TypeOrmModule.forFeature([ValueBlock, Page])],
    controllers: [ValueBlockController],
    providers: [ValueBlockService],
  })
  export class ValueBlockModule {}
