import { Base } from '@dto/base';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleData implements Base {
    @ApiProperty({
        type: String,
        description: '用户Id',
    })
    _id: string;

    @ApiProperty({
        type: [String],
        description: '用户角色',
    })
    roles: [];
}
