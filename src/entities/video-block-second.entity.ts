import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class VideoBlockSecond {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, page => page.videoBlockSeconds, { onDelete: 'CASCADE' })
  page: Page;

  @Column()
  url: string;
}