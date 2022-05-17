import { AdminResponse } from './../core/utils';
/*
https://docs.nestjs.com/controllers#controllers
*/
import { InsertUserInfoDto } from '@dto/user/view/InsertUserInfoDto';
import { Body, Controller, Post, UseGuards, Catch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '@services/user.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private menuService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '插入用户信息' })
    @Post('insertUserInfo')
    async insertUserInfo(@Body() insertMenu: InsertUserInfoDto) {
        this.menuService.createUserInfo(insertMenu);
        return AdminResponse.success('插入成功');
    }
}
