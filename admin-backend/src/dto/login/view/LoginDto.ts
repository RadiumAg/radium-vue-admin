import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from './../../user/UserBase';

export class LoginDto extends UserBase {
    @ApiProperty({
        type: String,
        description: '用户名密码',
    })
    password: string;
}
