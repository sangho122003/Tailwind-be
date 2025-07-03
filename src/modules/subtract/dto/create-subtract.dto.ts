import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateSubtractDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  pageId: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  dis: string;
}
