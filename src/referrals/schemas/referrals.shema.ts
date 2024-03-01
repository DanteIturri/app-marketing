import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Referral {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  referralsLink: string;

  @Prop({ required: false })
  referralsQuantity?: number;

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId })
  referralsUserId?: string[];
}

export const ReferralSchema = SchemaFactory.createForClass(Referral);
