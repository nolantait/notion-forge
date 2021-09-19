import type {Block, BaseBlock, BlockType, ExtendedRecordMap} from "./";

export type Intersection<T, U> = T extends U ? T : never;

export type MapPageUrl = (pageId: string,
  recordMap: ExtendedRecordMap
) => string;
export type MapImageUrl = (url: string, block: Block) => string;

export interface NotionContext {
  recordMap: ExtendedRecordMap;
  components: Components;
  mapPageUrl: MapPageUrl;
  mapImageUrl: MapImageUrl;
  rootPageId: string | undefined;
  fullPage: boolean;
  previewImages: boolean;
  showCollectionViewDropdown: boolean;
  defaultPageIcon: string | null;
  defaultPageCover: string | null;
  defaultPageCoverPosition: number;
  zoom: any;
}

// Base Types
// ----------------------------------------------------------------------------

export type ID = string;
/**
 * Unique identifier for collection properties representing the columns in a
 * traditional relational database.
 *

 * Either a 4-character hash like `o;Os` or `title` as a special, reserved
 * property ID for collection title properties.
 *

 * You can think of `title` properties as primary indexes that are guaranteed
 * to exist as in a traditional database.
 */

export type Role = "editor" | "reader" | "none" | "read_and_write";

export interface User {
  id: ID;
  version: number;
  email: string;
  given_name: string;
  family_name: string;
  profile_photo: string;
  onboarding_completed: boolean;
  mobile_onboarding_completed: boolean;
}

export interface NotionMap<T> {
  [key: string]: {
    role: Role;
    value: T;
  };
}

export type UserMap = NotionMap<User>;

export interface PageMap {
  [pageId: ID]: ExtendedRecordMap | null;
}

export type Lookup<
  T,
  Key extends keyof T,
  Prop extends string
  > = Prop extends keyof T[Key] ? T[Key][Prop] : never;

type BlockForType<T extends BlockType, B> = B extends {type: T} ? B : never;

type DTO<T extends BlockType, B> = BlockForType<T, B>;

type DTORepository = {
  [Key in BlockType]: DTO<Key, BaseBlock>;
};

type EntityRepository = {
  [Key in BlockType]: Entity<Key>;
};

type Serializer = {
  [Key in BlockType]: (
    args: Lookup<BlockSchema, Key, "entity">
  ) => Lookup<BlockSchema, Key, "dto">;
};

type Deserializer = {
  [Key in BlockType]: (
    args: Lookup<BlockSchema, Key, "dto">
  ) => Lookup<BlockSchema, Key, "entity">;
};

type BlockSchema = {
  [Key in BlockType]: {
    dto: DTORepository[Key];
    entity: EntityRepository[Key];
    serialize: Serializer[Key];
    deserialize: Deserializer[Key];
  };
};

class Entity<T> {
  //public dto: Lookup<BlockSchema, T, "dto">;
  //constructor(dto: Lookup<BlockSchema, T, "dto">);
}
