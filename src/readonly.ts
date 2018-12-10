function readonly(bool: boolean) {
  return function<T, F extends Function>(
    _target: T,
    _key: keyof T,
    descriptor: TypedPropertyDescriptor<F>,
  ) {
    return {
      ...descriptor,
      writable: bool,
    };
  };
}

export default readonly;
