import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Menu } from './menu';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop()
    roleName: string;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                autopopulate: true,
            },
        ],
    })
    menus: Menu[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.plugin(mongooseAutoPopulate as any);
