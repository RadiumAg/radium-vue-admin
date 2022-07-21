import { defineStore } from 'pinia';
import type { TGetUserMenusInfo } from '@core/http/apis/user/models/TGetUserMenuInfoRes';

type Role = {
  currentRole: string;
  roles: TGetUserMenusInfo['roles'];
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

export const { setRoles } = useRoleStore();
