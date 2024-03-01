import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

// export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  images: string[];

  @Prop()
  logo: string;

  @Prop([{ question: { type: String }, answer: { type: String } }])
  form: Record<string, any>[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Post' }])
  posts: Record<string, any>[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Plan' }])
  plans: Record<string, any>[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
