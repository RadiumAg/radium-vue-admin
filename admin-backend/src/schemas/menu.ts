import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';
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

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                autopopulate: true,
            },
        ],
    })
    children: Menu[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);

MenuSchema.plugin(mongooseAutoPopulate as any);
