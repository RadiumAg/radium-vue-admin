import { Prop } from '@nestjs/mongoose';

export class Menu {
  @Prop()
  menuName: string;
}
