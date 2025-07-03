import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BenefitsBlock } from './benefits-block.entity';

@Entity()
export class BenefitItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => BenefitsBlock, (block) => block.items, { onDelete: 'CASCADE' })
  block: BenefitsBlock;
}