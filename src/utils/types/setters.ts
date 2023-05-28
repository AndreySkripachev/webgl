export type Setters<T extends object> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (newValue: T[K]) => void;
};
