import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Socials } from '../enums/socials.enum';
import { Schema as MongooseSchema } from 'mongoose';

// Almacena interaccion que se hizo con la IA para generar el plan de marketing
@Schema({ timestamps: true })
export class Post {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Plan' })
  planId: string;

  //   @Prop()
  //   week_number: number;

  @Prop({ type: String, enum: Socials, required: true })
  social: Socials;

  @Prop() // ejem. "Una publicación destacada mostrando una variedad de pulseras y collares de oro y plata."
  description: string;

  @Prop()
  message: string; // ejem. "Descubre la elegancia y versatilidad de nuestros accesorios de joyería en oro y plata. ✨"

  @Prop()
  banner: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
