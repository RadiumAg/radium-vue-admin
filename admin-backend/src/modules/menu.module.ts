import { MongooseModule } from '@nestjs/mongoose';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MenuController } from 'src/controllers/menu.controller';
import { Menu, MenuSchema } from 'src/schemas/menu';
import { MenuService } from 'src/services/menu.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    ],
    controllers: [MenuController],
    providers: [MenuService],
})
export class MenuModule {}
