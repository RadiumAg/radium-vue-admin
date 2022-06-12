import type { Base } from '../../common/models/Base';

export type TUpdateRoleData = {
  roleName: string;
  _id: string;
  menus: string;
} & Base;
