import { MenuService } from 'src/services/menu.service';
/*../dto/menu/mogodb/CreateMenu../dto/menu/mogodb/CreateMenu
https://docs.nestjs.com/controllers#controllers
*/

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UpdateMenuDto } from '@dto/menu/view/UpdateMenuDto';
import { InsertMenuDto } from '@dto/menu/view/InsertMenuDto';
import { AdminResponse } from 'src/core/utils';

@ApiTags('menu')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) {}

    @ApiOperation({ summary: '插入菜单' })
    @Post('insertMenu')
    async insetMenu(@Body() createMenu: InsertMenuDto) {
        this.menuService.create(createMenu);
        return AdminResponse.success('插入成功');
    }

    @ApiOperation({ summary: '更新菜单' })
    @Post('updateMenu')
    async updateMenu(@Body() updateMenu: UpdateMenuDto) {
        this.menuService.update(updateMenu);
        return AdminResponse.success('更新成功');
    }

    @ApiOperation({ summary: '获得所有菜单' })
    @Get('getAll')
    async getMenu() {
        return AdminResponse.success('更新成功', this.menuService.getAll());
    }
}
