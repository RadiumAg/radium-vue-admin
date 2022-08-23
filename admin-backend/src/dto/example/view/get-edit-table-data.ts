import { ApiProperty } from '@nestjs/swagger';

export class GetEditTableData {
    @ApiProperty({
        type: String,
        description: '用户名称',
    })
    name: string;

    @ApiProperty({
        type: String,
        description: '邮箱',
    })
    email: string;

    @ApiProperty({
        type: String,
        description: '地址',
    })
    address: string;
}
