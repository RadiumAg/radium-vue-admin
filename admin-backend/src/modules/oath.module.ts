import { OAthService } from './../services/oath.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserService } from '@services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schemas/user';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/core/auth/strategies/jwt.strategy';
import { OAthController } from '@controllers/oath.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        PassportModule,
    ],
    controllers: [OAthController],
    providers: [OAthService, JwtStrategy],
})
export class OAthModule {}
