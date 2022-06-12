import { ApiProperty } from '@nestjs/swagger';

export class RoleBase {
    @ApiProperty({
        type: String,
        required: true,
        description: '权限名称',
    })
    roleName: string;
}
