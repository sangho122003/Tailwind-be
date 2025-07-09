import { ApiProperty } from '@nestjs/swagger';

export class CreateHeaderBlockDto {
  @ApiProperty({ example: 'BOOST YOUR' })
  title: string;

  @ApiProperty({ example: '340B Potential' })
  title2: string;

  @ApiProperty({ example: 1, description: 'ID Page' })
  ID_page: number;
}
