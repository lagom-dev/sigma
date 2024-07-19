 type DeepReadonly<T> = {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
  };

  type NestedObject = Record<string, any>