import { Base } from '@dto/base';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteByIdData implements Base {
    @ApiProperty({
        type: String,
        description: '子菜单',
    })
    _id: string;
}
