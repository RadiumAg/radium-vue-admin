import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schemas/user';
import { Model, StringSchemaDefinition } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async getUserInfoByAccount(account: string, password: string) {
        const userInfo = this.userModel.findOne({
            $and:
        });
    }
}
