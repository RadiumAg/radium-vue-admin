/*
https://docs.nestjs.com/providers#services
*/
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from 'src/schemas/menu';
import { CreateMenuDto } from '@dto/menu/mogodb/CreateMenuDto';
import { flatMenu } from 'src/core/menu';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
    ) {}

    async create(createMenuDto: CreateMenuDto) {
        console.log(flatMenu(createMenuDto));
        const createdMenu = this.menuModel.create(flatMenu(createMenuDto));
        return (await createdMenu).map(c => {
            return c.save();
        });
    }

    async update(updateMenuDto) {
        this.menuModel.updateOne(updateMenuDto);
    }

    async getAll() {
        return this.menuModel.find();
    }
}
