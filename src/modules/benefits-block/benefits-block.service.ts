import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BenefitsBlock } from '@/entities/benefits-block.entity';
import { BenefitItem } from '@/entities/benefit-item.entity';
import { Page } from '@/entities/page.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BenefitsBlockService {
  constructor(
    @InjectRepository(BenefitsBlock)
    private blockRepo: Repository<BenefitsBlock>,
    @InjectRepository(BenefitItem)
    private itemRepo: Repository<BenefitItem>,
    @InjectRepository(Page)
    private pageRepo: Repository<Page>,
  ) { }
  async findByPageId(pageId: number) {
    const page = await this.pageRepo.findOneBy({ id: pageId });
    if (!page) {
      throw new Error(`Page with ID ${pageId} not found`);
    }

    const blocks = await this.blockRepo.find({
      where: { page: { id: pageId } },
      relations: ['items'],
    });

    return blocks;
  }

  async createBlockWithItems(data: {
    title: string;
    pageId: number;
    items: { title: string; description: string }[];
    images: Express.Multer.File[];
  }) {
    const page = await this.pageRepo.findOneBy({ id: data.pageId });
    if (!page) throw new Error('Page not found');

    const block = this.blockRepo.create({ title: data.title, page });
    await this.blockRepo.save(block);

    const itemEntities = data.items.map((item, index) =>
      this.itemRepo.create({
        title: item.title,
        description: item.description,
        image: `/uploads/benefits/${data.images[index].filename}`,
        block,
      }),
    );

    await this.itemRepo.save(itemEntities);

    return {
      message: 'Created successfully',
      block,
      items: itemEntities,
    };
  }
}
