import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from '../user-base';

export class InsertUserInfoData extends UserBase {
    @ApiProperty({
        type: String,
        description: '用户密码',
    })
    password: string;
}
