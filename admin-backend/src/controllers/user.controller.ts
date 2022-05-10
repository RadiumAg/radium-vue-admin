/*
https://docs.nestjs.com/controllers#controllers
*/

import { InsertUserInfoDto } from '@dto/user/view/InsertUserInfoDto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '@services/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private menuService: UserService) {}

    @ApiOperation({ summary: '插入用户信息' })
    @Post('insertUserInfo')
    async insertUserInfo(@Body() insertMenu: InsertUserInfoDto) {
        this.menuService.createUserInfo(insertMenu);
    }
}
