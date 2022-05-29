import { UpdateMenuData } from '@dto/menu/view/UpdateMenuData';
import { HttpException, HttpStatus } from '@nestjs/common';
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
            if (!isValidObjectId(createMenuDto.parentId)) {
                throw new HttpException(
                    'parentId不是有效的ObjectId',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            const existMenu = await this.getById(createMenuDto.parentId);
            if (!existMenu) {
                throw new HttpException(
                    '不存在的menu',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            const createMenu = await (
                await this.menuModel.create(createMenuDto)
            ).save();

            return (await this.menuModel.updateOne({
                id: existMenu.id,
                children: existMenu.children
                    ? existMenu.children.concat(createMenu)
                    : [createMenu],
            })) as any;
        } else {
            return await (await this.menuModel.create(createMenuDto)).save();
        }
    }

    async update(updateMenuDto: UpdateMenuData) {
        await this.menuModel.updateOne(updateMenuDto);
    }

    async getAll() {
        const allMenus = this.menuModel
            .find({ parentId: '' })
            .populate('children')
            .exec();
        return allMenus;
    }

    async getById(id: string) {
        return this.menuModel.findOne({ id });
    }
}
