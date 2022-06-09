import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Menu } from './menu';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop()
    roleName: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }] })
    menus: Menu;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
