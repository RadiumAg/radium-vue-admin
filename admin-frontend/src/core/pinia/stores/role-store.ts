import { defineStore } from 'pinia';
import type { GetUserMenusInfo } from '@core/http/apis/user/types';

type Role = {
  currentRole: string;
  roles: GetUserMenusInfo['roles'];
};

export const useRoleStore = defineStore('role', () => {
  const roleInfo = useLocalStorage<Role>('role', {
    roles: [],
    currentRole: '',
  });

  const setRoles = (roles: Role['roles']) => {
    roleInfo.value.roles = roles;
  };

  return {
    roleInfo,
    setRoles,
  };
});
