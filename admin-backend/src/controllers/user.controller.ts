import { AdminResponse } from './../core/utils';
/*
https://docs.nestjs.com/controllers#controllers
*/
import { InsertUserInfoDto } from '@dto/user/view/InsertUserInfoDto';
import { Body, Controller, Post, HttpStatus, UseGuards } from '@nestjs/common';
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
        try {
            this.menuService.createUserInfo(insertMenu);
            return AdminResponse.success('插入成功');
        } catch (e) {
            AdminResponse.error(
                e instanceof Error && e.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
