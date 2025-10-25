import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpRequest {
  @ApiProperty({
    example: 'lisovyy13@gmail.com',
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'User password',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    maxLength: 40,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @ApiProperty({
    example: false,
    description: 'Remember me option',
    required: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  rememberMe?: boolean;
}
