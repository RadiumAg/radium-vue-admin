import { UserBase } from '@dto/user/user-base';
import { GetPageRoleRes } from '@dto/role/view/get-page-role.res';
import { Base } from '@dto/base';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserMenusInfoRes extends UserBase implements Base {
    @ApiProperty({
        description: '用户Id',
    })
    _id: string;

    @ApiProperty({
        description: '角色',
        type: [GetPageRoleRes],
    })
    roles: GetPageRoleRes[];
}
