import type { Blocks, Formats } from "./";
import type { Simplify, CamelCase } from "type-fest";
import type { Decorated } from "../entities";

export type Factory<T extends Blocks.BlockType> = Fetch<T, "factory">;

type Lookup<
  T,
  Key extends keyof T,
  Prop extends string
> = Prop extends keyof T[Key] ? T[Key][Prop] : never;

type Fetch<Key extends keyof BlockSchema, Prop extends string> = Lookup<
  BlockSchema,
  Key,
  Prop
>;

type BlockDTO = {
  [Key in Blocks.BlockType]: Blocks.Container[Key];
};

type BlockFactory = {
  [Key in Blocks.BlockType]: ReadBlock<Key>;
};

type BlockSerializer = {
  [Key in Blocks.BlockType]: (args: Factory<Key>) => DTO<Key>;
};

type BlockDeserializer = {
  [Key in Blocks.BlockType]: (args: DTO<Key>) => Factory<Key>;
};

type BlockSchema = {
  [Key in Blocks.BlockType]: {
    dto: BlockDTO[Key];
    factory: BlockFactory[Key];
    serialize: BlockSerializer[Key];
    deserialize: BlockDeserializer[Key];
  };
};

// Remapping input types to specific transformed output types
// Decorations: [['a', 'a link']] get transformed into Decorated objects
type RemapDecoration<T> = T extends Formats.Decoration[] ? Decorated : T;
type Remapper<T> = RemapDecoration<T>;

type Mapping<T extends Blocks.Any, K extends keyof T> = {
  [Key in keyof T[K] as `${CamelCase<string & Key>}`]: Remapper<T[K][Key]>;
};
type PropertyMap<T extends Blocks.Any> = Mapping<T, "properties">;
type FormatMap<T extends Blocks.Any> = Mapping<T, "format">;
type Map<T extends Blocks.Any> = Simplify<PropertyMap<T> & FormatMap<T>>;
type ReadBlock<T extends Blocks.BlockType> = Required<Map<DTO<T>>>;
type DTO<T extends Blocks.BlockType> = Fetch<T, "dto">;
