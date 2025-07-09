import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { USER_EXAMPLES } from '@/constants/message';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: USER_EXAMPLES.EMAIL })
  email: string;

  @IsString()
  @ApiProperty({ example: USER_EXAMPLES.PASSWORD })
  password: string;
}
