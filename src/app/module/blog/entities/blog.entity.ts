import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop()
  title!: string;

  @Prop()
  thembnail!: string;

  @Prop()
  description!: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
