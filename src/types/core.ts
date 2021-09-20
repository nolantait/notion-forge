import type { Formats, Components, Blocks, API } from "./";

export type Intersection<T, U> = T extends U ? T : never;

// Base Types
// ----------------------------------------------------------------------------

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

export type ID = string;
export type URL = string;
export type Timestamp = number;
export type Author = ParentType & "notion_user";
export type ParentType = "space" | "block" | "table";
export type Role = "editor" | "reader" | "none" | "read_and_write";
export type PermissionType = "user_permission";

export type Permission = {
  role: Role;
  type: PermissionType;
  user_id: ID;
};

export type PropertyID = string;

/** Types of structured data supported by Notion collections */

export type PropertyType =
  | "title"
  | "text"
  | "number"
  | "select"
  | "multi_select"
  | "date"
  | "person"
  | "file"
  | "checkbox"
  | "url"
  | "email"
  | "phone_number"
  | "formula"
  | "relation"
  | "created_time"
  | "created_by"
  | "last_edited_time"
  | "last_edited_by";

export type PropertyMap = {
  [key: string]: Formats.Decoration[];
};

export type Attachable = {
  file_ids?: string[];
};

export type Identity = {
  id: ID;
  version: number;
  parent_id: ID;
  parent_table: ParentType;
  space_id?: ID;
  shard_id?: number;
  alive: boolean;
};

export type Creatable = {
  created_by_table: Author;
  created_by_id: ID;
  created_by: ID;
  created_time: Timestamp;
};

export type Editable = {
  last_edited_by_table: Author;
  last_edited_by_id: ID;
  last_edited_by: ID;
  last_edited_time: Timestamp;
};

export type MapPageUrl = (
  pageId: string,
  recordMap: API.ExtendedRecordMap
) => string;
export type MapImageUrl = (url: string, block: Blocks.Any) => string;

export interface NotionContext {
  recordMap: API.ExtendedRecordMap;
  components: Components.Any;
  mapPageUrl: MapPageUrl;
  mapImageUrl: MapImageUrl;
  rootPageId: string | undefined;
  fullPage: boolean;
  previewImages: boolean;
  showCollectionViewDropdown: boolean;
  defaultPageIcon: string | null;
  defaultPageCover: string | null;
  defaultPageCoverPosition: number;
  zoom: unknown;
}

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
  [pageId: ID]: API.ExtendedRecordMap | null;
}

export type Lookup<
  T,
  Key extends keyof T,
  Prop extends string
> = Prop extends keyof T[Key] ? T[Key][Prop] : never;

type BlockForType<T extends Blocks.BlockType, B> = B extends { type: T }
  ? B
  : never;

type DTO<T extends Blocks.BlockType, B> = BlockForType<T, B>;

type DTORepository = {
  [Key in Blocks.BlockType]: DTO<Key, Blocks.Any>;
};

type EntityRepository = {
  [Key in Blocks.BlockType]: Entity<Key>;
};

type Serializer = {
  [Key in Blocks.BlockType]: (
    args: Lookup<BlockSchema, Key, "entity">
  ) => Lookup<BlockSchema, Key, "dto">;
};

type Deserializer = {
  [Key in Blocks.BlockType]: (
    args: Lookup<BlockSchema, Key, "dto">
  ) => Lookup<BlockSchema, Key, "entity">;
};

type BlockSchema = {
  [Key in Blocks.BlockType]: {
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
