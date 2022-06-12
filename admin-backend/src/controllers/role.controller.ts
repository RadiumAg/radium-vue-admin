/*
https://docs.nestjs.com/controllers#controllers
*/

import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { AdminResponse } from '@core/utils';
import { AdminApiExtraModels } from '@decorator/admin-api-extra-models.decorator';
import { AdminApiResponse } from '@decorator/admin-api-response.decorator';
import { AdminController } from '@decorator/admin-controller.decorator';
import { GetPageRoleRes } from '@dto/role/view/get-page-role.res';
import { InsertRoleData } from '@dto/role/view/insert-role.data';
import { UpdateRoleData } from '@dto/role/view/update-role.data';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
    ApiOperation,
    ApiQuery,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { RoleService } from '@services/role.service';

@ApiTags('role')
@AdminApiExtraModels(GetPageRoleRes, UpdateRoleData)
@AdminController('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '插入角色' })
    @Post('insertRole')
    async insertRole(@Body() insertRoleData: InsertRoleData) {
        await this.roleService.create(insertRoleData);
        return AdminResponse.success('插入成功');
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '获取角色' })
    @AdminApiResponse({ items: { $ref: getSchemaPath(GetPageRoleRes) } })
    @ApiQuery({ required: false, name: 'pageSize' })
    @ApiQuery({ required: false, name: 'pageIndex' })
    @Get('getPageRole')
    async getPageRole(
        @Query('pageSize') pageSize: number,
        @Query('pageIndex') pageIndex: number,
    ) {
        return this.roleService.getPageRole(pageIndex, pageSize);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '获取全部角色' })
    @AdminApiResponse({ items: { $ref: getSchemaPath(GetPageRoleRes) } })
    @Get('getAllRole')
    async getAllRole() {
        const resData = await this.roleService.getAllRole();
        return AdminResponse.success('获取成功', resData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '更新角色' })
    @AdminApiResponse({ $ref: getSchemaPath(GetPageRoleRes) })
    @Get('updateRole')
    async updateRole(@Body() updateData: UpdateRoleData) {
        await this.roleService.updateById(updateData);
        return AdminResponse.success('更新成功');
    }
}
