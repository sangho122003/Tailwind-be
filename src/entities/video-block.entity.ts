import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class VideoBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, page => page.videoBlocks, { onDelete: 'CASCADE' })
  page: Page;

  @Column()
  urlvideo: string;

  @Column()
  title: string;

  @Column()
  dis: string;
}
