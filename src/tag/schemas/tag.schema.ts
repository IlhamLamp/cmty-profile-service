import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  color: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
