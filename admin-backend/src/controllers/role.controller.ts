/*
https://docs.nestjs.com/controllers#controllers
*/

import { AdminResponse } from '@core/utils';
import { AdminController } from '@decorator/admin-controller.decorator';
import { InsertRoleData } from '@dto/role/view/insert-role.data';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from '@services/role.service';

@ApiTags('role')
@Controller()
@AdminController('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post('insertRole')
    async insertRole(@Body() insertRoleData: InsertRoleData) {
        await this.roleService.create(insertRoleData);
        AdminResponse.success('插入成功');
    }
}
