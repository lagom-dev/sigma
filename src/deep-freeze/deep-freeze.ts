import { createImmutableHandler } from "./deep-freeze.utils";

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