import { ApiProperty } from '@nestjs/swagger';
import { RoleBase } from '../role-base';

export class InsertRoleData extends RoleBase {
    @ApiProperty({
        type: [String],
        required: true,
        description: '菜单Id',
    })
    menus: string[];
}
