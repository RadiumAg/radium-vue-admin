import { Base } from '@dto/base';
import { ApiProperty } from '@nestjs/swagger';
import { UserBase } from '../user-base';

export class GetAllUserInfoRes extends UserBase implements Base {
    @ApiProperty({ type: String, description: '用户Id' })
    _id: string;
}
