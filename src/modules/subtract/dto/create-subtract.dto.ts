  import { ApiProperty } from '@nestjs/swagger';
  import { Transform } from 'class-transformer';
  import { IsString, IsNumber } from 'class-validator';

  export class CreateSubtractDto {
    @ApiProperty({ example: 1 })
    @Transform(({ value }) => parseInt(value))
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
