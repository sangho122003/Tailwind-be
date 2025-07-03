import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Page } from './page.entity';
import { BenefitItem } from './benefit-item.entity';

@Entity()
export class BenefitsBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Page, (page) => page.benefitsBlocks, { onDelete: 'CASCADE' })
  page: Page;

  @OneToMany(() => BenefitItem, (item) => item.block, { cascade: true })
  items: BenefitItem[];
}
