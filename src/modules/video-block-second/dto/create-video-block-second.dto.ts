import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateVideoBlockSecondDto {
  @ApiProperty({ example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
  @IsString()
  url: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  ID_page: number;
}
