export const defaultThrottleTime = 500; //ms

export const UPDATE_MODEL_VALUE_EVENT = 'update:modelValue';

export const autoMap = <T = Record<string, any>, S = Record<string, any>>(
  target: T,
  source: S,
) => {
  Object.keys(target).forEach(_ => {
    target[_] = source[_];
  });
};
