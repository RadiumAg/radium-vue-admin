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

    /**
     * 获得用户信息
     *
     * @param {string} username
     * @param {string} password
     * @return {*}
     * @memberof UserService
     */
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

    async getUserInfoById(id: string) {
        const userInfo = this.userModel.findById(id);
        return userInfo;
    }

    async getAllUser(select = ['-__v']) {
        return await this.userModel.find().select(select).exec();
    }
}
