import {noop} from './utils';
import {PlainObject} from './types';

function memoize<T, F extends Function>(
  _target: T,
  _key: keyof T,
  descriptor: TypedPropertyDescriptor<F>,
) {
  const fn = descriptor.value || noop;
  const cache: PlainObject = {};

  return {
    ...descriptor,
    value(...args: any[]) {
      const serializedArgs = JSON.stringify(args);

      if (cache[serializedArgs]) {
        return cache[serializedArgs];
      }

      cache[serializedArgs] = fn.apply(this, args);
      return cache[serializedArgs];
    },
  };
}

export default memoize;
