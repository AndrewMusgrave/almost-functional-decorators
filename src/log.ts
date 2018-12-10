import {noop} from './utils';

function log(message: string) {
  return function<T, F extends Function>(
    _target: T,
    _key: keyof T,
    descriptor: TypedPropertyDescriptor<F>,
  ) {
    const fn = descriptor.value || noop;

    return {
      ...descriptor,
      value(...args: any[]) {
        const result = fn.apply(this, args);
        // eslint-disable-next-line no-console
        console.log(`${message}: ${result}`);
        return result;
      },
    };
  };
}

export default log;
