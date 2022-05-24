import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
    @Prop()
    menuId: string;

    @Prop()
    menuName: string;

    @Prop()
    menuIcon: string;

    @Prop()
    children: Menu[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
