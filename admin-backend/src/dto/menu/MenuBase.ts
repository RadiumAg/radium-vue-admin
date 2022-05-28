import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MenuBase {
    @ApiProperty({
        type: String,
        description: '菜单图标',
        required: false,
    })
    menuIcon: string;

    @ApiProperty({
        type: String,
        description: '菜单名称',
        required: false,
    })
    menuName: string;

    @ApiProperty({
        type: String,
        description: '菜单地址',
        required: true,
    })
    menuUrl: string;

    @ApiProperty({
        type: String,
        description: '父Id',
        required: true,
    })
    @IsNotEmpty()
    parentId: string;
}
