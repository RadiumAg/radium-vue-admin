import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schemas/user';
import { CreateUserInfoDto } from '@dto/user/mogodb/create-userInfo.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async getUserInfoByAccount(username: string, password: string) {
        const userInfo = this.userModel.findOne({
            username,
            password,
        });
        return userInfo;
    }

    async createUserInfo(userInfoDto: CreateUserInfoDto) {
        const userInfo = this.getUserInfoByAccount(
            userInfoDto.username,
            userInfoDto.password,
        );
        if (userInfo) {
            throw new Error('该用户已经存在');
        }
        const insertUserInfo = this.userModel.create(userInfoDto);
        return (await insertUserInfo).save();
    }

    async getUserInfoById(id: string, select = ['-__v']) {
        const userInfo = await this.userModel
            .findById(id)
            .select(select)
            .exec();
        return userInfo;
    }

    async getAllUser(select = ['-__v']) {
        return await this.userModel.find().select(select).exec();
    }

    async updateRoles(id: string, roles: []) {
        return await this.userModel.findByIdAndUpdate(id, { roles }).exec();
    }

    async deleteById(id: string[]) {
        return await this.userModel.findByIdAndDelete(id);
    }
}
