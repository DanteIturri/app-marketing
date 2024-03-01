import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

// Almacena interaccion que se hizo con la IA para generar el plan de marketing
@Schema({ timestamps: true })
export class Plan {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop()
  duration_in_weeks: number;

  @Prop()
  posts_per_week: number;

  @Prop({ type: [Object] })
  facebook_posts_prompts: Record<string, any>[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Post' }])
  posts: Record<string, any>[];
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
