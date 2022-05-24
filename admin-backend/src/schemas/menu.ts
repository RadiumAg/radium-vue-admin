import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
    @Prop()
    menuName: string;

    @Prop()
    menuIcon: string;

    @Prop()
    children?: string[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
