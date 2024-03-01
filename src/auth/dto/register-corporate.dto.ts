import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterCorporateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  readonly role: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  readonly organisation: string;
}
