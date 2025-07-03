import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class TestimonialBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  dis: string;

  @ManyToOne(() => Page, page => page.testimonialBlocks, { onDelete: 'CASCADE' })
  page: Page;
}