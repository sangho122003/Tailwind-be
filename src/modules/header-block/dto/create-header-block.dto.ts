import { ApiProperty } from '@nestjs/swagger';

export class CreateHeaderBlockDto {
  @ApiProperty({ example: 'Header Title' })
  title: string;

  @ApiProperty({ example: 'Subheading Text' })
  title2: string;

  @ApiProperty({ example: 1, description: 'ID của Page liên kết' })
  ID_page: number;
}
