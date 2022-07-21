import { defineStore } from 'pinia';

type User = {
  username: string;
  userId: string;
};

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User>({
    userId: '',
    username: '',
  });

  const setUserInfo = (user: User) => {
    userInfo.value = user;
  };

  return {
    userInfo,

    setUserInfo,
  };
});

export const { setUserInfo } = useUserStore();
