// https://github.com/Microsoft/TypeScript/issues/1863
export interface PlainObject {
  [key: string]: any;
}

export interface Options {
  leading: boolean;
  trailing: boolean;
}
