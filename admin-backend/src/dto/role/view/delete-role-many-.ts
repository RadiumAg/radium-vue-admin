import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleManyData {
    @ApiProperty({
        type: [String],
        required: true,
        description: '菜单Id',
    })
    id: string[];
}
