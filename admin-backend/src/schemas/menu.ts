import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
  @Prop()
  menuName: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
