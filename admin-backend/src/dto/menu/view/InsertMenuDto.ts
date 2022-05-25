import { ApiProperty } from '@nestjs/swagger';
import { MenuBase } from '../MenuBase';

export class InsertMenuDto extends MenuBase {
    @ApiProperty({
        type: String,
        description: '子菜单',
        required: false,
    })
    children: MenuBase[];
}
