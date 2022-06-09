import { Model } from 'mongoose';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '@schemas/role';
import { CreateRoleDto } from '@dto/role/mogodb/create-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        return (await this.roleModel.create(createRoleDto)).save();
    }
}
