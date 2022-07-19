import { AdminResponse } from '@core/utils';
import { GetLoginUserInfoRes } from '@dto/user/view/get-login-userInfo.res';
import { InsertUserInfoData } from '@dto/user/view/Insert-userInfo.data';
import { Body, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { UserService } from '@services/user.service';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { AdminController } from '@decorator/admin-controller.decorator';
import { AdminApiExtraModels } from '@decorator/admin-api-extra-models.decorator';
import { AdminApiResponse } from '@decorator/admin-api-response.decorator';
import { OAthService } from '@services/oath.service';
import { UpdateUserRoleData } from '@dto/user/view/update-user-role.data';
import { GetAllUserInfoRes } from '@dto/user/view/get-all-userinfo.res';
import { GetUserMenusInfoRes } from '@dto/menu/view/get-user-menus-info.res';

@ApiTags('user')
@AdminApiExtraModels(
    GetLoginUserInfoRes,
    GetAllUserInfoRes,
    GetUserMenusInfoRes,
)
@AdminController('user')
@ApiBearerAuth()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly oAthService: OAthService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @AdminApiResponse({ $ref: getSchemaPath(GetUserMenusInfoRes) })
    @ApiOperation({ summary: '获取当前用户菜单信息' })
    @Get('getUserMenusInfo')
    async getUserMenusInfo(@Req() request) {
        const userId = this.oAthService.getUserInfo(
            request.cookies['admin-login'],
        ).userId;
        const userData = await this.userService.getUserMenus(userId);
        return AdminResponse.success('获得成功', userData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '删除用户信息' })
    @Post('deleteUserMany')
    async deleteUserMany(@Body() ids: Array<string>) {
        this.userService.deleteById(ids);
        return AdminResponse.success('删除成功');
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '插入用户信息' })
    @Post('insertUserInfo')
    async insertUserInfo(@Body() insertMenu: InsertUserInfoData) {
        this.userService.createUserInfo(insertMenu);
        return AdminResponse.success('插入成功');
    }

    @UseGuards(JwtAuthGuard)
    @AdminApiResponse({ $ref: getSchemaPath(GetLoginUserInfoRes) })
    @ApiOperation({ summary: '获取当前登录用户信息' })
    @Get('getLoginUserInfo')
    async getLoginUserInfo(@Req() request) {
        const resData = new GetLoginUserInfoRes();
        const loginUserInfo = await this.userService.getUserInfoById(
            this.oAthService.getUserInfo(request.cookies['admin-login']).userId,
        );
        resData.userId = loginUserInfo.id;
        resData.username = loginUserInfo.username;
        return resData;
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '获得所有用户' })
    @AdminApiResponse({
        type: 'array',
        items: { $ref: getSchemaPath(GetAllUserInfoRes) },
    })
    @Get('getAllUser')
    async getAllUser() {
        const resData = await this.userService.getAllUser(['-__v', '-roles']);
        return AdminResponse.success('获取成功', resData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '更新用户的权限' })
    @Post('updateUserRole')
    async updateUserRole(@Body() updateUserData: UpdateUserRoleData) {
        await this.userService.updateRoles(
            updateUserData._id,
            updateUserData.roles,
        );
        return AdminResponse.success('更新成功');
    }

    @UseGuards(JwtAuthGuard)
    @AdminApiResponse({ type: 'array', items: { type: 'string' } })
    @ApiOperation({ summary: '获得用户角色' })
    @Get('getUserRolesById')
    async getUserRolesById(@Query('id') id: string) {
        const roles = (
            await this.userService.getUserInfoById(id, ['roles', '-_id'])
        ).roles;
        return AdminResponse.success('获取成功', roles);
    }
}
