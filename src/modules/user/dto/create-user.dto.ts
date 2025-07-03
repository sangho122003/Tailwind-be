import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Sang Ho' })
  name: string;

  @ApiProperty({ example: 'sangho@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}
