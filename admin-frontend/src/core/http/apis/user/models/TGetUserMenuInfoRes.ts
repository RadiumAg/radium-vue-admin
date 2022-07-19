import type { Base } from '../../common/models/Base';
import type { TGetAllRes } from '../../menu/models/TGetAllRes';
import type { TGetPageRoleRes } from '../../role/models/TGetPageRoleRes';

export type TGetUserMenusInfo = {
  roles: (Omit<TGetPageRoleRes, 'menus'> & {
    menus: TGetAllRes[];
  })[];
} & Base;
