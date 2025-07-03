import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoBlockDto {
  @ApiProperty({ example: "https://www.youtube.com/watch?v=example" })
  urlvideo: string;

  @ApiProperty({ example: "IMPROVE YOUR HOSPITAL'S 340B PROGRAM OPERATIONS WITH 340B HEALTH" })
  title: string;

  @ApiProperty({ example: "Hello world" })
  dis: string;

  @ApiProperty({ example: 1 })
  ID_page: number;
}
