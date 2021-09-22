import type { Blocks, Formats } from "./";
import type { Decorated } from "../entities";

import type { Utils } from "@types";

export type Factory<T extends Blocks.BlockType> = Fetch<T, "factory">;

// type Test = Factory<"page">;
// type SchemaTest = BlockSchema["page"]

// Private Generics

type IBlock<T extends Blocks.BlockType> = Required<TMap<T>>;

type BlockFactory = {
  [Key in Blocks.BlockType]: IBlock<Key>;
};

type BlockDTO = {
  [Key in Blocks.BlockType]: Blocks.Container[Key];
};

type BlockSchema = {
  [Key in Blocks.BlockType]: {
    dto: BlockDTO[Key];
    factory: BlockFactory[Key];
  };
};

// Decorations: [['a', 'a link']] get transformed into Decorated objects
type RemapDecoration<T> = T extends Formats.Decoration[] ? Decorated : T;
// Remapping type keys to specific transformed output types
type Remapper<T> = RemapDecoration<T>;

// Convert keys to cammel case properties on an object
type Mapping<T extends Blocks.BlockType, Path> = {
  [Key in keyof Fetch<T, Path> as `${Utils.CamelCase<string & Key>}`]: Remapper<
    Fetch<T, Path, Key>
  >;
};
// Map properties and formats of different blocks
type TProperties<T extends Blocks.BlockType> = Mapping<T, "dto.properties">;
type TFormat<T extends Blocks.BlockType> = Mapping<T, "dto.format">;
type TMap<T extends Blocks.BlockType> = TProperties<T> & TFormat<T>;

type Fetch<T extends Blocks.BlockType, K, Path = void> = Path extends void
  ? Utils.Get<BlockSchema, Utils.Join<[string & T, string & K], ".">>
  : Utils.Get<
      BlockSchema,
      Utils.Join<[string & T, string & K, string & Path], ".">
    >;
