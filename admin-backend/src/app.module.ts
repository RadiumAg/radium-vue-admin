import { LoginModule } from './modules/login.module';
import { UserModule } from './modules/user.module';
import { MenuModule } from './modules/menu.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './core/auth/constants';
import { OAthModule } from '@modules/oath.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        LoginModule,
        UserModule,
        MenuModule,
        OAthModule,
        PassportModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin'),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
