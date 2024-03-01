export class ProductDto {
  userId: string;

  name: string;

  description: string;

  category: string;

  images: string[];

  logo: string;

  form: Record<string, any>[];
}
