import { MenuService } from 'src/services/menu.service';
import { CreateMenuDto } from './../dto/menu/CreateMenu';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('insertMenu')
  async insertMenu(@Body() createMenu: CreateMenuDto) {
    this.menuService.create(createMenu);
  }

  @Get('getAll')
  async getMenu() {
    return this.menuService.getAll();
  }
}
