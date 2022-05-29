import { Base } from '@dto/Base';
import { ApiProperty } from '@nestjs/swagger';
import { MenuBase } from './../MenuBase';

export class GetAllMenuDto extends MenuBase implements Base {
    @ApiProperty({
        type: [GetAllMenuDto],
        description: '子菜单',
    })
    children: GetAllMenuDto[];

    @ApiProperty({
        type: [GetAllMenuDto],
        description: '菜单Id',
    })
    _id: string;
}
