import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class ValueBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, (page) => page.valueBlocks, { onDelete: 'CASCADE' })
  page: Page;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  subject: string;
}