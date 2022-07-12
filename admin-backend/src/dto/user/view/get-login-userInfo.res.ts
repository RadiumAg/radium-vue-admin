import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from '../user-base';

export class GetLoginUserInfoRes extends UserBase {
    @ApiProperty({
        type: String,
        description: '用户名称',
    })
    userId: string;
}
