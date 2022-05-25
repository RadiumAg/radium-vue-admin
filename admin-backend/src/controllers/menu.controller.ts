import { MenuService } from 'src/services/menu.service';
/*../dto/menu/mogodb/CreateMenu../dto/menu/mogodb/CreateMenu
https://docs.nestjs.com/controllers#controllers
*/

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UpdateMenuDto } from '@dto/menu/view/UpdateMenuDto';
import { InsertMenuDto } from '@dto/menu/view/InsertMenuDto';
import { AdminResponse } from 'src/core/utils';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

@ApiTags('menu')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '插入菜单' })
    @Post('insertMenu')
    async insetMenu(@Body() insertMenu: InsertMenuDto) {
        const menu = await this.menuService.create(insertMenu);
        return AdminResponse.success('插入成功', menu.id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '更新菜单' })
    @Post('updateMenu')
    async updateMenu(@Body() updateMenu: UpdateMenuDto) {
        await this.menuService.update(updateMenu);
        return AdminResponse.success('更新成功');
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '获得所有权限菜单' })
    @Get('getAll')
    async getMenu() {
        const allMenus = await this.menuService.getAll();
        return AdminResponse.success('获得成功', this.menuService.getAll());
    }
}
