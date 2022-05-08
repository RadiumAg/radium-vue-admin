import { MenuService } from 'src/services/menu.service';
/*../dto/menu/mogodb/CreateMenu../dto/menu/mogodb/CreateMenu
https://docs.nestjs.com/controllers#controllers
*/

import { InsertMenu } from '@dto/menu/view/InsertMenu';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UpdateMenu } from '@dto/menu/view/UpdateMenu';

@ApiTags('menu')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @ApiOperation({ summary: '插入菜单' })
  @Post('insertMenu')
  async insertMenu(@Body() insertMenu: InsertMenu) {
    this.menuService.create(insertMenu);
  }

  @ApiOperation({ summary: '更新菜单' })
  @Post('updateMenu')
  async updateMenu(@Body() updateMenu: UpdateMenu) {
    this.menuService.create(updateMenu);
  }

  @ApiOperation({ summary: '获得所有菜单' })
  @Get('getAll')
  async getMenu() {
    return this.menuService.getAll();
  }
}
