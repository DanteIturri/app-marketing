import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePlanDto {
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
