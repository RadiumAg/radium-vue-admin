import { Model } from 'mongoose';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '@schemas/role';
import { CreateRoleDto } from '@dto/role/mogodb/create-role.dto';
import { UpdateRoleDto } from '@dto/role/mogodb/update-role-dto';

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
}
