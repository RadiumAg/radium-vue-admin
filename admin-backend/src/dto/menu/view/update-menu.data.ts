import { Base } from '@dto/base';
import { ApiProperty } from '@nestjs/swagger';
import { MenuBase } from '../menu-base';

export class UpdateMenuData extends MenuBase implements Base {
    @ApiProperty({
        required: true,
        description: 'id',
    })
    _id: string;
}
