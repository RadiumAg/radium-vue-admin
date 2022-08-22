import { ExampleController } from './../controllers/example.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ExampleController],
    providers: [],
})
export class ExampleModule {}
