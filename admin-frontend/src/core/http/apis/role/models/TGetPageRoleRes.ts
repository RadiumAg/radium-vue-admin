import type { Base } from '../../common/models/Base';

export type TGetPageRoleRes = {
  roleName: string;
  menus: string[];
} & Base;
