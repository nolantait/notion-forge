import type { Blocks, Formats } from "./";
import type {
  ValueOf,
  Merge,
  MergeExclusive,
  UnionToIntersection,
  Simplify,
  CamelCase,
} from "type-fest";

export type Lookup<
  T,
  Key extends keyof T,
  Prop extends string
> = Prop extends keyof T[Key] ? T[Key][Prop] : never;

export type Fetch<Key extends keyof BlockSchema, Prop extends string> = Lookup<
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

type Mapping<T extends Blocks.Any, K extends keyof T> = {
  [Key in keyof T[K] as `${CamelCase<string & Key>}`]: T[K][Key];
};
type PropertyMap<T extends Blocks.Any> = Mapping<T, "properties">;
type FormatMap<T extends Blocks.Any> = Mapping<T, "format">;
type Map<T extends Blocks.Any> = Simplify<PropertyMap<T> & FormatMap<T>>;
type ReadBlock<T extends Blocks.BlockType> = Required<Map<DTO<T>>>;
type Factory<T extends Blocks.BlockType> = Fetch<T, "factory">;
type DTO<T extends Blocks.BlockType> = Fetch<T, "dto">;

type Swaggy = keyof UnionToIntersection<Blocks.Properties.Any>;

declare const fuck: Swaggy;

type AnyProperty = UnionToIntersection<Blocks.Properties.Any>;
type AnyFormat = UnionToIntersection<Blocks.Format.Any>;

interface IBlock {
  readonly _properties: AnyProperty;
  readonly _format: AnyFormat;
}

type Mixable = new (...args: any[]) => IBlock;

function getProperty<T, K extends keyof T>(
  attributes: T,
  key: K,
  defval: T[K]
): T[K] {
  const value = attributes[key];
  return value === undefined ? defval : value;
}

function FormatPage<TBase extends Mixable>(Base: TBase) {
  return class Paging extends Base {
    get pageFullWidth(): boolean {
      return getProperty(this._format, "page_full_width", true);
    }

    get pageSmallText(): boolean {
      return getProperty(this._format, "page_small_text", false);
    }

    get pageCoverPosition(): number {
      return getProperty(this._format, "page_cover_position", 0.5);
    }

    get pageCover(): string {
      return getProperty(this._format, "page_cover", "");
    }

    get pageIcon(): string {
      return getProperty(this._format, "page_icon", "");
    }
  };
}

export class Block implements IBlock {
  readonly _properties: AnyProperty;
  readonly _format: AnyFormat;

  constructor() {
    return this;
  }
}

const Pageable = FormatPage(Block);
export class PageBlock extends Pageable implements Factory<"page"> {
  readonly blockLocked: boolean;
  readonly blockLockedBy: string;
  readonly title: Formats.Decoration[];
  readonly blockColor: Formats.Color;

  constructor() {
    super();
  }
}

export class CollectionViewBlock implements Factory<"collection_view"> {}

export class CollectionViewPageBlock
  extends Pageable
  implements Factory<"collection_view_page">
{
  title: Formats.Decoration[];
  blockLocked: boolean;
  blockLockedBy: string;
  blockColor: Formats.Color;
}
