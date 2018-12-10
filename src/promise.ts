function promise<T, F extends Function>(
  _target: T,
  _key: keyof T,
  descriptor: TypedPropertyDescriptor<F>,
): TypedPropertyDescriptor<(...args: any[]) => Promise<F>> {
  const fn = descriptor.value as F;
  const {writable, configurable, enumerable} = descriptor;

  return {
    writable,
    configurable,
    enumerable,
    value(...args: any[]): Promise<F> {
      return new Promise((resolve, reject) => {
        try {
          resolve(fn.apply(this, args));
        } catch (e) {
          reject(e);
        }
      });
    },
  };
}

export default promise;
