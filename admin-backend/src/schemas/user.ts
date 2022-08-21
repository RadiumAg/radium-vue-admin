import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre(['find', 'findOne'], function (next) {
    this.populate({
        path: 'roles',
        populate: { path: 'menus' },
    });
    next();
});
