import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LandlordDocument = HydratedDocument<Landlord>;

@Schema({ timestamps: true })
export class Landlord {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ default: '' })
  propertyAddress!: string;

  @Prop({ default: '' })
  propertyType!: string;

  @Prop({ default: '' })
  message!: string;

  @Prop({ enum: ['new', 'contacted', 'closed'], default: 'new' })
  status!: string;
}

export const LandlordSchema = SchemaFactory.createForClass(Landlord);
