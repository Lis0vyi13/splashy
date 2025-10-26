import { IsEmail, MinLength, MaxLength } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  @MaxLength(100, { message: 'Email must be at most 100 characters long' })
  email: string;
}
