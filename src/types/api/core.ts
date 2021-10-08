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
export type ParentType = "space" | "block" | "table" | "collection";
export type Role =
  | "editor"
  | "reader"
  | "none"
  | "read_and_write"
  | "comment_only";
export type PermissionType =
  | "user_permission"
  | "space_permission"
  | "bot_permission"
  | "public_permission";
export type LinkProtocol = "https" | "http" | "mailto" | "tel";

/** Block colors supported by Notion */

export type Color =
  | "transparent"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "teal"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "teal_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background";

export type Permission = {
  role: Role;
  type: PermissionType;
  user_id?: ID;
  added_timestamp?: number;
  allow_duplicate?: boolean;
  allow_search_engine_indexing?: boolean;
};

export type PropertyID = string;

export type Attachable = {
  file_ids?: string[];
};

export type Identity = {
  id: ID;
  version: number;
  parent_id: ID;
  parent_table: ParentType;
  space_id: ID;
  alive: boolean;
  shard_id?: number;
  copied_from?: ID;
};

export type Creatable = {
  created_by_table: Author;
  created_by_id: ID;
  created_time: Timestamp;
  created_by?: ID;
};

export type Editable = {
  last_edited_by_table: Author;
  last_edited_by_id: ID;
  last_edited_time: Timestamp;
};
