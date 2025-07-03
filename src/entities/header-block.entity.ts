import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class HeaderBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, page => page.headerBlocks, { onDelete: 'CASCADE' })
  page: Page;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  title2: string;
}