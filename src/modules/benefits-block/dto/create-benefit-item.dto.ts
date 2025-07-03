import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBenefitItemDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}
