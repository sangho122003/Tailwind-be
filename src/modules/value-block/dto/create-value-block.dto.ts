import { ApiProperty } from '@nestjs/swagger';

export class CreateValueBlockDto {
  
  @ApiProperty({example:2})
  pageId: number;
  
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @ApiProperty()
  title: string;

  @ApiProperty()
  subject: string;

}
