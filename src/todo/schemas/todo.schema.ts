import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema()
export class Todo extends mongoose.Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
