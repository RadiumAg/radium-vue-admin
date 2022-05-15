import { OathModule } from './modules/oath.module';
import { UserModule } from './modules/user.module';
import { MenuModule } from './modules/menu.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './core/auth/constants';

@Module({
    imports: [
        OathModule,
        UserModule,
        MenuModule,
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
