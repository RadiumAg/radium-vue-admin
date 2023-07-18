import { Model } from 'mongoose';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '@schemas/role';
import { CreateRoleDto, UpdateRoleDto } from '@dto/role/mogodb';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        return (await this.roleModel.create(createRoleDto)).save();
    }

    async updateById(updateRoleDto: UpdateRoleDto) {
        return await this.roleModel.findByIdAndUpdate(
            updateRoleDto._id,
            updateRoleDto,
        );
    }

    async getPageRole(pageIndex: number, pageSize: number) {
        return this.roleModel
            .find()
            .skip(pageIndex - 1)
            .limit(pageSize);
    }

    async getAllRole() {
        return await this.roleModel.find().exec();
    }

    async getRoleById(id: string) {
        return await this.roleModel.findById(id).exec();
    }

    async deleteRoleById(id: string) {
        return await this.roleModel.findByIdAndDelete(id);
    }

    async deleteRoleMany(id: string[]) {
        return await this.roleModel.findByIdAndDelete(id);
    }
}
