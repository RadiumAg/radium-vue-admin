/*
https://docs.nestjs.com/modules
*/

import { LoginController } from '@controllers/login.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [LoginController],
    providers: [],
})
export class LoginModule {}
