import type { Blocks, Utils } from "@types";

type Mapping<T> = {
  [K in keyof T as Utils.CamelCase<K>]: Utils.CamelCasedPropertiesDeep<T[K]>;
};

export type Factory<T extends Blocks.BlockType> = Mapping<Blocks.Container[T]>;
