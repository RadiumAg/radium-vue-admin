import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { Body, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UpdateMenuData } from '@dto/menu/view/update-menu.data';
import { InsertMenuData } from '@dto/menu/view/insert-menu.data';
import { AdminApiResponse } from '@decorator/admin-api-response.decorator';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { AdminResponse } from '@core/utils';
import { MenuService } from '@services/menu.service';
import { AdminApiExtraModels } from '@decorator/admin-api-extra-models.decorator';
import { AdminController } from '@decorator/admin-controller.decorator';
import { GetAllMenuRes } from '@dto/menu/view/get-all-menu.res';

@ApiTags('menu')
@ApiBearerAuth()
@AdminApiExtraModels(GetAllMenuRes)
@AdminController('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '插入菜单' })
    @AdminApiResponse({ type: 'string' })
    @Post('insertMenu')
    async insetMenu(@Body() insertMenu: InsertMenuData) {
        const menu = await this.menuService.create(insertMenu);
        return AdminResponse.success('插入成功', menu.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '更新菜单' })
    @AdminApiResponse({ type: 'string' })
    @Post('updateMenu')
    async updateMenu(@Body() updateMenu: UpdateMenuData) {
        await this.menuService.update(updateMenu);
        return AdminResponse.success('更新成功');
    }

    @ApiOperation({ summary: '获得所有权限菜单' })
    @AdminApiResponse({ $ref: getSchemaPath(GetAllMenuRes) })
    @UseGuards(JwtAuthGuard)
    @Get('getAllMenu')
    async getAllMenu() {
        const allMenus = await this.menuService.getAll();
        return AdminResponse.success('获取成功', allMenus);
    }

    @ApiOperation({ summary: '根据Id获得单个菜单' })
    @AdminApiResponse({ $ref: getSchemaPath(GetAllMenuRes) })
    @UseGuards(JwtAuthGuard)
    @Get('getById')
    async getById(@Query('id') id: string) {
        const menu = await this.menuService.getById(id);
        return AdminResponse.success('获取成功', menu);
    }
}
