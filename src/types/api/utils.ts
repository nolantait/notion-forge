export type {
  Get,
  Join,
  Merge,
  UnionToIntersection,
  CamelCase,
  SnakeCase,
  PartialDeep,
  Primitive,
  CamelCasedPropertiesDeep,
  ValueOf,
  RequireAtLeastOne,
  JsonPrimitive,
  JsonObject,
  ConditionalKeys,
  ConditionalExcept,
} from "type-fest";

import type { Formats, Blocks } from "./";
import type { Decorated } from "@entities";

export type Intersection<T, U> = T extends U ? T : never;

export type Simplify<T> = { [key in keyof T]: ToPrimitive<T[key]> };

export type Prefix<T, U extends string> = {
  [K in keyof T as `${U}_${string & K}`]: T[K];
};

type ToPrimitive<T> = T extends BlackList
  ? T
  : T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends (..._args: any[]) => any
  ? (..._args: Parameters<T>) => ReturnType<T>
  : T extends Record<string, any>
  ? { [key in keyof T]: ToPrimitive<T[key]> }
  : T;

type BlackList =
  | Decorated
  | Formats.Decoration[]
  | string
  | Blocks.Properties.Any; // your enums go here like Enum1 | Enum2 | Enum 3
