import { Base } from '@dto/base';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateUserRoleData implements Base {
    @ApiProperty({
        type: String,
        description: '用户Id',
    })
    @IsNotEmpty()
    _id: string;

    @ApiProperty({
        type: [String],
        description: '用户角色',
    })
    @IsArray()
    roles: [];
}
