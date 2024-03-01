import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
// import { HydratedDocument, SchemaasMongooseSchema } from 'mongoose';

// export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false, default: 'user' })
  role: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }])
  products: Record<string, any>[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Plan' }])
  plans: Record<string, any>[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Post' }])
  posts: Record<string, any>[];

  @Prop({ required: false, default: false })
  referralLinkActivate?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
