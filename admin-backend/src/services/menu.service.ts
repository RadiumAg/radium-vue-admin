import { AdminError } from './../../../admin-frontend/src/core/http/admin-error';
/*
https://docs.nestjs.com/providers#services
*/
import { isValidObjectId, Model } from 'mongoose';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from 'src/schemas/menu';
import { CreateMenuDto } from '@dto/menu/mogodb/CreateMenuDto';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
    ) {}

    async create(createMenuDto: CreateMenuDto) {
        try {
            if (!isValidObjectId(createMenuDto.parent)) {
                throw new AdminError(
                    '不是有效的ObjectId',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            await this.getById(createMenuDto.parent);
            const createdMenu = this.menuModel.create(createMenuDto);
            return (await createdMenu).save();
        } catch (e) {
            throw e;
        }
    }

    async update(updateMenuDto) {
        this.menuModel.updateOne(updateMenuDto);
    }

    async getAll() {
        return this.menuModel.find();
    }

    async getById(id: string) {
        return await this.menuModel.findOne({ id });
    }
}
