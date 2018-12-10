import {noop} from './utils';
import {Options} from './types';

function debounce(
  delay: number,
  {leading = false, trailing = true}: Partial<Options> = {},
) {
  return function<T, F extends Function>(
    _target: T,
    _key: keyof T,
    descriptor: TypedPropertyDescriptor<F>,
  ) {
    const fn = descriptor.value || noop;
    let timeout: NodeJS.Timer | null;

    return {
      ...descriptor,
      value(...args: any[]) {
        const cb = () => {
          timeout = null;

          if (!trailing) {
            return;
          }

          return fn.apply(this, args);
        };

        const shouldInvoke = leading && !timeout;

        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(cb, delay);

        if (!shouldInvoke) {
          return;
        }

        return fn.apply(this, args);
      },
    };
  };
}

export default debounce;
