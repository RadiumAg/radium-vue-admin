import { ApiProperty } from '@nestjs/swagger';

export class MenuBase {
  @ApiProperty({
    type: String,
    description: '菜单图标',
    required: false,
  })
  menuIcon: string;

  @ApiProperty({
    type: String,
    description: '菜单名称',
    required: false,
  })
  menuName: string;
}
