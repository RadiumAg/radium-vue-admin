import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
                autopopulate: true,
            },
        ],
    })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongooseAutoPopulate as any);
