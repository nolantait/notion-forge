import { Api } from "./";

type NarrowBy<T, U> = T extends U ? T : never;

// type Test = WithTrait<{ properties: Properties.Title }>;
export type WithTrait<T> = NarrowBy<Api.Blocks.DTO, T>;
export type Constructor<T = {}> = new (...a: any[]) => T;
export type AnyFunction<A = any> = (...input: any[]) => A;
export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;
