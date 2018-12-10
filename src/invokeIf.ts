import {noop} from './utils';

function invokeIf(boolExpression: boolean) {
  return function<T, F extends Function>(
    _target: T,
    _key: keyof T,
    descriptor: TypedPropertyDescriptor<F>,
  ) {
    let fn = descriptor.value;

    return {
      configurable: true,
      get() {
        return boolExpression ? fn : noop;
      },
      set(newFn: F) {
        fn = newFn;
      },
    };
  };
}

export default invokeIf;
