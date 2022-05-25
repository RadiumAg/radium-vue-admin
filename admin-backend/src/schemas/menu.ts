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
    menuUrl: string;

    @Prop()
    parentId: string;

    @Prop()
    children: Menu[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu)
    .path('parentId')
    .ref(Menu);
