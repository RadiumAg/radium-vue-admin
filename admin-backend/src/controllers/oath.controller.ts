import { LoginDto } from '@dto/login/view/LoginDto';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@services/user.service';
import { AdminResponse } from 'src/core/utils';

@ApiTags('oAth')
@Controller('oAth')
export class OAthController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
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
                this.jwtService.sign({
                    username: userInfo.userName,
                    userId: userInfo.id,
                }),
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
