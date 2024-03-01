import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserCorporate {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: 'corporate' })
  role: string;
  @Prop({ required: true })
  organisation: string;
}
export const UserCorporateSchema = SchemaFactory.createForClass(UserCorporate);
