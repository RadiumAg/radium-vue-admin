import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('menu-tags', () => {
  const menus = ref([]);

  return { menus };
});
