import type { Base } from '../../common/models/Base';
import type { TGetPageRoleRes } from '../../role/models/TGetPageRoleRes';

export type TGetUserMenusInfo = {
  roles: TGetPageRoleRes[];
} & Base;
