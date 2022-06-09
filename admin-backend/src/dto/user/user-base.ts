import { ApiProperty } from '@nestjs/swagger';

export class UserBase {
    @ApiProperty({
        type: String,
        description: '用户名称',
    })
    username: string;
}
