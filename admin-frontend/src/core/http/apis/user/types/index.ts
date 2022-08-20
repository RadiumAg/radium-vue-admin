import type { Base } from '../../common/types/Base';
import type { GetAllRes } from '../../menu/types';
import type { GetPageRoleRes } from '../../role/types';

export type GetAllUserRes = ({ userName: string } & Base)[];

export type GetLoginUserInfo = {
  userId: string;
  username: string;
};

export type GetUserMenusInfo = {
  username: string;
  roles: (Omit<GetPageRoleRes, 'menus'> & {
    menus: GetAllRes[];
  })[];
} & Base;
