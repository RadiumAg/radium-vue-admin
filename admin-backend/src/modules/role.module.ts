import { Role, RoleSchema } from '@schemas/role';
import { RoleService } from '@services/role.service';
/*
https://docs.nestjs.com/modules
*/

import { RoleController } from '@controllers/role.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    ],
    controllers: [RoleController],
    providers: [RoleService],
})
export class RoleModule {}
