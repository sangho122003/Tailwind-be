// src/modules/user/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';
import { USER_EXAMPLES } from '@/constants/message';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: USER_EXAMPLES.NAME })
  name: string;

  @IsEmail()
  @ApiProperty({ example: USER_EXAMPLES.EMAIL })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: USER_EXAMPLES.PASSWORD })
  password: string;
}
