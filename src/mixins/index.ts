export * as Ability from "./abilities";
export * as Traits from "./traits";

export type Constructor<T, A extends unknown[] = any[]> = new (...a: A) => T;
export type AnyFunction<A = any> = (...input: any[]) => A;
export type AnyConstructor<A = object> = new (...input: any[]) => A;

export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;
