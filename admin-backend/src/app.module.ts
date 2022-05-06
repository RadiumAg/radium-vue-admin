import { MenuModule } from './modules/menu.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MenuModule,
    MongooseModule.forRoot(
      'mongodb+srv://RadiumAg:<Zhangleiyin@123>@cluster0.oqppd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
