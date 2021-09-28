import type { Block, RecordMap } from "@entities";
import type { Formats, Components, Blocks, API } from "./";

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
export type Role = "editor" | "reader" | "none" | "read_and_write";
export type PermissionType = "user_permission";
export type LinkProtocol = "https" | "http" | "mailto" | "tel";

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

export type MapPageUrl = (pageId: Blocks.ID, rootPageId?: Blocks.ID) => string;
export type MapImageUrl = (url: string, block: Block<Blocks.Every>) => URL;

export interface NotionContext {
  recordMap: RecordMap;
  components: Components.Any;
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
