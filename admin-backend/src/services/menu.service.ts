import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from 'src/schemas/menu';
import { CreateMenuDto, UpdateMenuDto } from '@dto/menu/mogodb';

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

            return await this.menuModel.findByIdAndUpdate(existMenu.id, {
                $push: {
                    children: createMenu.id,
                },
            });
        } else {
            return await (await this.menuModel.create(createMenuDto)).save();
        }
    }

    async update(updateMenuDto: UpdateMenuDto) {
        await this.menuModel.findByIdAndUpdate(
            updateMenuDto._id,
            updateMenuDto,
        );
    }

    async getAll() {
        const allMenus = this.menuModel.find({ parentId: '' }).exec();
        return allMenus;
    }

    async getById(id: string) {
        return this.menuModel.findById(id);
    }

    async deleteById(id: string) {
        return this.menuModel.findByIdAndDelete(id).exec();
    }
}
