import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSocialDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
