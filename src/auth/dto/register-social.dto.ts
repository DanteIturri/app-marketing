import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterSocialDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  role: string;
}
