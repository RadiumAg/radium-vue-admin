import type { Base } from '../../common/models/Base';
import type { Role } from './Role';

export type TUpdateRoleData = Omit<Role, 'roleName'> & Base;
