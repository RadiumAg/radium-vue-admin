import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }] })
    children: Menu[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
