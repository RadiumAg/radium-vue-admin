import { UserService } from '@services/user.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserController } from '@controllers/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schemas/user';
import { OAthModule } from './oath.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        OAthModule,
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
