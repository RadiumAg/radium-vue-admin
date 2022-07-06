import type { Ref } from 'vue';

export const LAYOUT_PROVIDE_KEY = Symbol();

export type LayoutProvide = {
  isCollapse: Ref<boolean>;
};
