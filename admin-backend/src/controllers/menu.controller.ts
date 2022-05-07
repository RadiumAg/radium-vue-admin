import { MenuService } from 'src/services/menu.service';
import { CreateMenuDto } from './../dto/menu/CreateMenu';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';

@ApiTags('menu')
@ApiBearerAuth()
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
