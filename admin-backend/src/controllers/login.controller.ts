import { LoginDto } from '@dto/login/view/LoginDto';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@services/user.service';
import { AdminResponse } from 'src/core/utils';
import { OAthService } from '@services/oath.service';

@ApiTags('login')
@Controller('login')
export class LoginController {
    constructor(
        private readonly userService: UserService,
        private readonly oAthService: OAthService,
    ) {}

    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response,
    ) {
        const userInfo = await this.userService.getUserInfoByAccount(
            loginDto.userName,
            loginDto.password,
        );

        if (userInfo) {
            response['cookie'](
                'admin-login',
                this.oAthService.sign(userInfo.userName, userInfo.id),
            );
            return AdminResponse.success('登录成功');
        } else {
            return AdminResponse.error(
                '没有这个账户信息',
                HttpStatus.UNAUTHORIZED,
            );
        }
    }
}
