import { Body, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService, OAthService } from '@services';
import { AdminResponse } from '@core/utils';
import { LoginData } from '@dto/login/view';
import { AdminController } from '@decorator';

@ApiTags('oath')
@AdminController('oath')
export class OAthController {
    constructor(
        private readonly userService: UserService,
        private readonly oAthService: OAthService,
    ) {}

    @Post('login')
    async login(
        @Body() loginDto: LoginData,
        @Res({ passthrough: true }) response,
    ) {
        const userInfo = await this.userService.getUserInfoByAccount(
            loginDto.username,
            loginDto.password,
        );

        if (userInfo) {
            response['cookie'](
                'admin-login',
                this.oAthService.sign(userInfo.username, userInfo.id),
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
