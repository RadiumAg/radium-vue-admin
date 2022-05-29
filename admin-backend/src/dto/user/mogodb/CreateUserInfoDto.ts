import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from '../UserBase';

export class CreateUserInfoDto extends UserBase {
    @ApiProperty({
        type: String,
        description: '用户密码',
    })
    password: string;
}
