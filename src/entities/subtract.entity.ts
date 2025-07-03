import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class Subtract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, page => page.subtracts, { onDelete: 'CASCADE' })
  page: Page;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  dis: string;
}