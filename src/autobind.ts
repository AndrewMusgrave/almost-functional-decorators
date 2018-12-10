import {noop} from './utils';

function autobind<T, F extends Function>(
  target: T,
  key: keyof T,
  descriptor: TypedPropertyDescriptor<F>,
) {
  let fn = descriptor.value || noop;

  return {
    get() {
      const self = this;
      let boundFn = fn.bind(this);

      Object.defineProperty(target, key, {
        get() {
          return boundFn;
        },
        set(value) {
          boundFn = value.bind(self);
        },
      });

      return boundFn;
    },
    set(value: F) {
      fn = value;
    },
  };
}

export default autobind;
