import { UserModule } from './modules/user.module';
import { MenuModule } from './modules/menu.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './core/auth/constants';
import { OAthController } from '@controllers/oath.controller';

@Module({
    imports: [
        UserModule,
        MenuModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
        PassportModule,
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin'),
    ],
    controllers: [OAthController],
    providers: [],
})
export class AppModule {}
