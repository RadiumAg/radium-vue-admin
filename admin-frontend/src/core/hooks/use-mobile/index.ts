import { useResizeObserver } from '@vueuse/core';

const MOBILE_WIDTH = 992;

export const useMobile = () => {
  const isMobile = ref(false);
  useResizeObserver(document.body, ([entry]) => {
    const { width } = entry.contentRect;
    if (width < MOBILE_WIDTH) isMobile.value = true;
    else isMobile.value = false;
  });

  return isMobile;
};
