import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty({ example: 'PHARMACY' })
  name: string;

  @ApiProperty({ example: 'pharmacy' })
  url: string;
}
