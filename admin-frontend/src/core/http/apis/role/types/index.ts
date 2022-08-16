import type { Base } from '../../common/types/Base';

export type Role = { roleName: string; menus: string[] };

export type GetPageRoleRes = Role & Base;

export type InserTRoleData = Role;

export type UpdateRoleData = Omit<Role, 'roleName'> & Base;
