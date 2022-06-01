import { AdminResponse } from '@core/utils';
import { GetLoginUserInfoRes } from '@dto/user/view/GetLoginUserInfoRes';
import { InsertUserInfoData } from '@dto/user/view/InsertUserInfoData';
import { Body, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '@services/user.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { AdminController } from '@decorator/AdminController';
import { AdminApiExtraModels } from '@decorator/AdminApiExtraModels';
import { AdminApiResponse } from '@decorator/AdminApiResponse';
import { OAthService } from '@services/oath.service';

@ApiTags('user')
@AdminApiExtraModels(GetLoginUserInfoRes)
@AdminController('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly oAthService: OAthService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '插入用户信息' })
    @Post('insertUserInfo')
    async insertUserInfo(@Body() insertMenu: InsertUserInfoData) {
        this.userService.createUserInfo(insertMenu);
        return AdminResponse.success('插入成功');
    }

    @UseGuards(JwtAuthGuard)
    @AdminApiResponse(GetLoginUserInfoRes)
    @ApiOperation({ summary: '获取当前登录用户信息' })
    @Get('getLoginUserInfo')
    async getLoginUserInfo(@Req() request) {
        const resData = new GetLoginUserInfoRes();
        const loginUserInfo = await this.userService.getUserInfoById(
            this.oAthService.getUserInfo(request.cookies['admin-login']).userId,
        );
        resData.userId = loginUserInfo.id;
        resData.username = loginUserInfo.userName;
        return resData;
    }
}
