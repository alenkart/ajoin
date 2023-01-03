export interface BaseOption<T extends string> {
  name: string;
  description: string;
  type: T;
  required?: boolean;
}

export interface StringOption extends BaseOption<"string"> {
  autocomplete?: boolean;
}

export interface UserOption extends BaseOption<"user"> {}

export type Option = StringOption | UserOption;
