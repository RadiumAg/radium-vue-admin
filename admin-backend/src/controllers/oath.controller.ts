import { LoginDto } from '@dto/login/view/LoginDto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@services/user.service';

@Controller('oAth')
export class OAthController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
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
        response['cookie']('admin-login', this.jwtService.sign(userInfo));
    }
}
