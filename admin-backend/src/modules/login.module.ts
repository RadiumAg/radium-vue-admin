/*
https://docs.nestjs.com/modules
*/

import { OAthController } from '@controllers/oath.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [OAthController],
    providers: [],
})
export class LoginModule {}
