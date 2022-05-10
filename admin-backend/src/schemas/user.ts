import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
