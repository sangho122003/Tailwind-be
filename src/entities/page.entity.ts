import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HeaderBlock } from '@/entities/header-block.entity';
import { ValueBlock } from '@/entities/value-block.entity';
import { BenefitsBlock } from '@/entities/benefits-block.entity';
import { Subtract } from '@/entities/subtract.entity';
import { VideoBlock } from '@/entities/video-block.entity';
import { VideoBlockSecond } from '@/entities/video-block-second.entity';
import { TestimonialBlock } from '@/entities/testimonial-block.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  url: string;

  @OneToMany(() => HeaderBlock, block => block.page)
  headerBlocks: HeaderBlock[];

  @OneToMany(() => ValueBlock, block => block.page)
  valueBlocks: ValueBlock[];

  @OneToMany(() => BenefitsBlock, block => block.page)
  benefitsBlocks: BenefitsBlock[];

  @OneToMany(() => Subtract, block => block.page)
  subtracts: Subtract[];

  @OneToMany(() => VideoBlock, block => block.page)
  videoBlocks: VideoBlock[];

  @OneToMany(() => VideoBlockSecond, block => block.page)
  videoBlockSeconds: VideoBlockSecond[];

  @OneToMany(() => TestimonialBlock, block => block.page)
  testimonialBlocks: TestimonialBlock[];
}