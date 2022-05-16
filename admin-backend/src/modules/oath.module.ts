import { OathService } from './../services/oath.service';
import { OAthController } from './../controllers/oath.controller';
/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import { UserService } from '@services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schemas/user';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/auth/constants';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [],        
    providers: [OathService, UserService],
})
export class OathModule {}
