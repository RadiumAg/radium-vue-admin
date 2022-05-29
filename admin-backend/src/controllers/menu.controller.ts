import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { UpdateMenuData } from '@dto/menu/view/UpdateMenuData';
import { InsertMenuData } from '@dto/menu/view/InsertMenuData';
import { AdminApiResponse } from '@decorator/AdminApiResponse';
import { JwtAuthGuard } from '@core/auth/guards/jwt-auth.guard';
import { AdminResponse } from '@core/utils';
import { MenuService } from '@services/menu.service';
import { GetAllMenuDto } from '@dto/menu/mogodb/GetAllMenuDto';
import { AdminApiExtraModels } from '@decorator/AdminApiExtraModels';
import { AdminController } from '@decorator/AdminController';

@ApiTags('menu')
@ApiBearerAuth()
@AdminApiExtraModels(GetAllMenuDto)
@AdminController('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '插入菜单' })
    @AdminApiResponse(String)
    @Post('insertMenu')
    async insetMenu(@Body() insertMenu: InsertMenuData) {
        const menu = await this.menuService.create(insertMenu);
        return AdminResponse.success('插入成功', menu.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '更新菜单' })
    @AdminApiResponse(String)
    @Post('updateMenu')
    async updateMenu(@Body() updateMenu: UpdateMenuData) {
        await this.menuService.update(updateMenu);
        return AdminResponse.success('更新成功');
    }

    @ApiOperation({ summary: '获得所有权限菜单' })
    @AdminApiResponse(GetAllMenuDto)
    @UseGuards(JwtAuthGuard)
    @Get('getAllMenu')
    async getAllMenu() {
        const allMenus = await this.menuService.getAll();
        return AdminResponse.success('获得成功', allMenus);
    }
}
