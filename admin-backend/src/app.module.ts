import { OathModule } from './modules/oath.module';
import { UserModule } from './modules/user.module';
import { MenuModule } from './modules/menu.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './core/auth/constants';
import { JwtStrategy } from './core/auth/strategies/jwt.strategy';

@Module({
    imports: [
        OathModule,
        UserModule,
        MenuModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin'),
    ],
    controllers: [],
    providers: [JwtStrategy],
})
export class AppModule {}
