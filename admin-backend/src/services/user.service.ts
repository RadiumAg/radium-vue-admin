import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schemas/user';
import { CreateUserInfoDto } from '@dto/user/mogodb/create-userInfo.dto';
import { Menu } from '@schemas/menu';
import { Role } from '@schemas/role';
import { cloneDeep } from 'lodash';

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

    async getUserMenus(userId: string) {
        const userData = await this.userModel.findById(userId).exec();

        userData.roles.forEach(((role: Role) => {
            const parentMenus = role.menus.filter(menu => menu.parentId === '');
            parentMenus.forEach(parent => {
                organizationMenus(parent, role.menus);
            });
            role.menus = cloneDeep(parentMenus);
        }) as any);
        return userData;
    }
}

const organizationMenus = (parentMenu: Menu, menus: Menu[]) => {
    if (!parentMenu.children.length) return [];
    parentMenu.children = menus.filter(
        menu => menu.parentId === parentMenu['id'],
    );

    parentMenu.children.forEach(menu => {
        organizationMenus(menu, menus);
    });
};
