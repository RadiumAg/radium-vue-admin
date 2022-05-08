import { LoginService } from './services/user.service;
import { MenuModule } from './modules/menu.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MenuModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin'),
  ],
  controllers: [AppController],
  providers: [LoginService, AppService],
})
export class AppModule {}
