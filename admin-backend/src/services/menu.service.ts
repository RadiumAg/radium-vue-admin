import { HttpException, HttpStatus } from '@nestjs/common';
/*
https://docs.nestjs.com/providers#services
*/
import { isValidObjectId, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from 'src/schemas/menu';
import { CreateMenuDto } from '@dto/menu/mogodb/CreateMenuDto';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
    ) {}

    async create(createMenuDto: CreateMenuDto) {
        if (createMenuDto.parentId) {
            const existMenu = await this.getById(createMenuDto.parentId);
            if (!isValidObjectId(createMenuDto.parentId)) {
                throw new HttpException(
                    'parentId不是有效的ObjectId',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            if (!existMenu) {
                throw new HttpException(
                    '不存在的menu',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
        const createdMenu = this.menuModel.create(createMenuDto);
        return (await createdMenu).save();
    }

    async update(updateMenuDto) {
        this.menuModel.updateOne(updateMenuDto);
    }

    async getAll() {
        const allMenus = await this.menuModel.find();
        return allMenus;
    }

    async getById(id: string) {
        return await this.menuModel.findOne({ id });
    }
}
