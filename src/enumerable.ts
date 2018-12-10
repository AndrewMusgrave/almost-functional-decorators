function enumerable(bool: boolean) {
  return function<T, F extends Function>(
    _target: T,
    _key: keyof T,
    descriptor: TypedPropertyDescriptor<F>,
  ) {
    return {
      ...descriptor,
      enumerable: bool,
    };
  };
}

export default enumerable;
