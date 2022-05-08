import { CreateMenuDto } from '@dto/menu/mogodb/CreateMenu';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from 'src/schemas/menu';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<MenuDocument>) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const createdMenu = this.menuModel.create(createMenuDto);
    return (await createdMenu).save();
  }

  async update(updateMenuDto) {
    this.menuModel.updateOne(updateMenuDto);
  }

  async getAll() {
    return this.menuModel.find();
  }
}
