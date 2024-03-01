import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlanDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  duration_in_weeks: number;

  @IsNumber()
  @IsNotEmpty()
  posts_per_week: number;

  @IsArray()
  @IsNotEmpty()
  facebook_posts_prompts: Record<string, any>[];
}
