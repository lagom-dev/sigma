export const isObject = (value: unknown): value is Record<string, any> => {
  return value !== null && typeof value === 'object';
};

const getProps = (obj: any): { [key: string]: PropertyDescriptor } => {
  const length = obj.length || Object.keys(obj).length;
  const entries = Array.isArray(obj)
    ? [...obj.entries(), [length, length]]
    : Object.entries(obj);

  return entries.reduce((acc, [key, value]) => {
    const propKey = key === length ? 'length' : key;
    acc[propKey] = {
      value,
      configurable: false,
      writable: false
    };
    return acc;
  }, {} as { [key: string]: PropertyDescriptor });
};


export function createImmutableHandler<T extends object>(obj: T): ProxyHandler<T> {
  const props = getProps(obj);

  return {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set() {
      throw new Error(`Cannot modify readonly property`);
    },
    deleteProperty() {
      throw new Error(`Cannot delete readonly property`);
    },
    defineProperty(target, prop, descriptor) {
      if (props.hasOwnProperty(prop)) {
        throw new Error(`Cannot redefine readonly property ${String(prop)}`);
      }
      return Reflect.defineProperty(target, prop, descriptor);
    }
  };
}

export function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  const propNames = Object.getOwnPropertyNames(obj);

  for (const name of propNames) {
    const value = (obj as any)[name];

    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }

  if (obj instanceof Element) {
    return new Proxy(obj, createImmutableHandler(obj)) as DeepReadonly<T>;
  }

  return Object.freeze(obj) as DeepReadonly<T>;
}
