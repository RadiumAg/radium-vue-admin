import { Base } from '@dto/base';
import { ApiProperty } from '@nestjs/swagger';
import { RoleBase } from './../role-base';

export class GetPageRoleRes extends RoleBase implements Base {
    @ApiProperty({
        type: String,
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
