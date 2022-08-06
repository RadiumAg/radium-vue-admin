import { UploadModule } from './modules/upload.module';
import { RoleModule } from './modules/role.module';
import { LoginModule } from './modules/login.module';
import { UserModule } from './modules/user.module';
import { MenuModule } from './modules/menu.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { OAthModule } from '@modules/oath.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        UploadModule,
        RoleModule,
        LoginModule,
        UserModule,
        MenuModule,
        OAthModule,
        RoleModule,
        PassportModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.development'],
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin'),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
