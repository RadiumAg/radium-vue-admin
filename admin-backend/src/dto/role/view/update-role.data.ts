import { Base } from '@dto/base';
import { ApiProperty } from '@nestjs/swagger';
import { RoleBase } from './../role-base';

export class UpdateRoleData extends RoleBase implements Base {
    @ApiProperty({
        type: String,
        required: true,
        description: 'roleId',
    })
    _id: string;

    @ApiProperty({
        type: [String],
        required: true,
        description: '菜单Id',
    })
    menus: string[];
}
