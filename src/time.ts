import {noop} from './utils';

function time(name: string) {
  return function<T, F extends Function>(
    _target: T,
    _key: keyof T,
    descriptor: TypedPropertyDescriptor<F>,
  ) {
    const fn = descriptor.value || noop;

    return {
      ...descriptor,
      value(...args: any[]) {
        // eslint-disable-next-line no-console
        console.time(name);
        const result = fn.apply(this, args);
        // eslint-disable-next-line no-console
        console.timeEnd(name);
        return result;
      },
    };
  };
}

export default time;
