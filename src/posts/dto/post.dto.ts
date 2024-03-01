import { IsNotEmpty, IsString } from 'class-validator';
import { Socials } from '../enums/socials.enum';

export class PostDto {
  @IsString({ message: 'user id debe ser un string' })
  userId: string;

  @IsString({ message: 'product Id id debe ser un string' })
  productId: string;

  @IsString({ message: 'plan id debe ser un string' })
  planId: string;

  social: Socials;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  message: string; // ejem. "Descubre la elegancia y versatilidad de nuestros accesorios de joyería en oro y plata. ✨"

  @IsString()
  @IsNotEmpty()
  banner: string;
}
