function configurable(bool: boolean) {
  return function<T, F extends Function>(
    _target: T,
    _key: keyof T,
    descriptor: TypedPropertyDescriptor<F>,
  ) {
    return {
      ...descriptor,
      configurable: bool,
    };
  };
}

export default configurable;
