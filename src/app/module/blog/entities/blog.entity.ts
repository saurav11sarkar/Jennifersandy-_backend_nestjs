import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title!: string;

  @Prop({ unique: true, sparse: true })
  slug!: string;

  @Prop({ default: '' })
  thumbnail!: string;

  @Prop({ default: '' })
  excerpt!: string;

  @Prop({ default: '' })
  content!: string;

  @Prop({ default: '' })
  category!: string;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ default: '' })
  author!: string;

  @Prop({ type: Date, default: null })
  publishedAt!: Date | null;

  @Prop({ default: true })
  isPublished!: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.index({ category: 1 });
BlogSchema.index({ isPublished: 1 });
