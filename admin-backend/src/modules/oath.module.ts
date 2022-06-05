import { OAthService } from './../services/oath.service';
/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schemas/user';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/core/auth/strategies/jwt.strategy';
import { UserService } from '@services/user.service';

const jwtModule = JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1 days' },
});

@Global()
@Module({
    imports: [
        jwtModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
    ],
    controllers: [],
    providers: [OAthService, JwtStrategy, UserService],
    exports: [OAthService, jwtModule],
})
export class OAthModule {}
