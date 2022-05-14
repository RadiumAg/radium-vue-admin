import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schemas/user';
import { CreateUserInfoDto } from '@dto/user/mogodb/CreateUserInfoDto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    /**
     * 获得用户信息
     *
     * @param {string} userName
     * @param {string} password
     * @return {*}
     * @memberof UserService
     */
    async getUserInfoByAccount(userName: string, password: string) {
        const userInfo = await this.userModel.findOne({ userName, password });
        return userInfo;
    }

    async createUserInfo(userInfoDto: CreateUserInfoDto) {
        const insertUserInfo = this.userModel.create(userInfoDto);
        return (await insertUserInfo).save();
    }
}
