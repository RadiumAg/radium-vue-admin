import { Base } from '@dto/Base';
import { ApiProperty } from '@nestjs/swagger';
import { MenuBase } from '../menu-base';

export class GetAllMenuRes extends MenuBase implements Base {
    @ApiProperty({
        type: [GetAllMenuRes],
        description: '子菜单',
    })
    children: GetAllMenuRes[];

    @ApiProperty({
        type: String,
        description: '菜单Id',
    })
    _id: string;

    @ApiProperty({
        type: GetAllMenuRes,
        description: '父Id',
    })
    parentId: string;
}
