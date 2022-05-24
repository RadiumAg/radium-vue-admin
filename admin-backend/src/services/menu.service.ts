/*
https://docs.nestjs.com/providers#services
*/
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from 'src/schemas/menu';
import { CreateMenuDto } from '@dto/menu/mogodb/CreateMenuDto';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
    ) {}

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
