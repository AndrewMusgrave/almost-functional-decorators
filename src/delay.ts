import {noop} from './utils';

function delay(delay: number) {
  return function<T, F extends Function>(
    _target: T,
    _key: keyof T,
    descriptor: TypedPropertyDescriptor<F>,
  ) {
    const fn = descriptor.value || noop;

    return {
      ...descriptor,
      value(...args: any[]) {
        setTimeout(() => {
          return fn.apply(this, args);
        }, delay);
      },
    };
  };
}

export default delay;
