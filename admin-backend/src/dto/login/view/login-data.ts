import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from '../../user/user-base';

export class LoginData extends UserBase {
    @ApiProperty({
        type: String,
        description: '用户名密码',
    })
    password: string;
}
