import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: 'Sang Ho' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'sangho@example.com' })
  email: string;

  @Column({ select: false }) 
  @ApiProperty({ example: '********', writeOnly: true })
  password: string;
}