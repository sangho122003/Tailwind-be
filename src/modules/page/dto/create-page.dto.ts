import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty({ example: 'Pharmacy' })
  name: string;

  @ApiProperty({ example: 'pharmacy' })
  url: string;
}
