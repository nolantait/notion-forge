import type { ConditionalKeys } from "type-fest";
import type { ID, Role, NotionMap } from "./";
import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

export type BlockMap = NotionMap<Any>;

type BlockType =
  | "page"
  | "text"
  | "bookmark"
  | "bulleted_list"
  | "numbered_list"
  | "header"
  | "sub_header"
  | "sub_sub_header"
  | "quote"
  | "equation"
  | "to_do"
  | "table_of_contents"
  | "divider"
  | "column_list"
  | "column"
  | "callout"
  | "toggle"
  | "image"
  | "embed"
  | "gist"
  | "video"
  | "figma"
  | "typeform"
  | "codepen"
  | "excalidraw"
  | "tweet"
  | "maps"
  | "pdf"
  | "audio"
  | "drive"
  | "file"
  | "code"
  | "collection_view"
  | "collection_view_page"
  | "transclusion_container"
  | "transclusion_reference"
  | "alias";

/** The different block values a block can have. */

export type Any =
  | Text
  | Page
  | BulletedList
  | NumberedList
  | Header
  | SubHeader
  | SubSubHeader
  | Todo
  | TableOfContents
  | Divider
  | ColumnList
  | Column
  | Quote
  | Equation
  | Code
  | Image
  | Video
  | Figma
  | Typeform
  | Codepen
  | Excalidraw
  | Tweet
  | Pdf
  | Maps
  | Audio
  | GoogleDrive
  | File
  | Embed
  | Gist
  | Callout
  | Bookmark
  | Toggle
  | CollectionView
  | CollectionViewPage
  | Sync
  | SyncPointer
  | Alias;

type Intersection<T, U> = T extends U ? T : never;

export type AnyContent = Intersection<Any, BaseContentBlock>;
export type AnyText = Intersection<Any, BaseTextBlock>;

export type AnyAsset =
  | Video
  | Image
  | Embed
  | Figma
  | Typeform
  | Excalidraw
  | Maps
  | Tweet
  | Pdf
  | Gist
  | Codepen
  | GoogleDrive;

/**
 * Base properties shared by all blocks.
 */

type ParentType = string | "space" | "block" | "table";

export interface BaseBlock {
  id: ID;
  type: BlockType;
  properties?: Properties.Any;
  format?: Format.Any;
  content?: ID[];
  space_id?: ID;
  parent_id: ID;
  parent_table: ParentType;
  version: number;
  created_time: number;
  last_edited_time: number;
  alive: boolean;
  created_by_table: string;
  created_by_id: ID;
  last_edited_by_table: string;
  last_edited_by_id: ID;
}

export interface BaseTextBlock extends BaseBlock {
  // some text blocks occasionally have children
  content?: ID[];
  properties?: Properties.Title;
  format?: Format.Color;
}

export interface BaseContentBlock extends BaseBlock {
  properties: Properties.Source & Properties.Caption;
  format?: Format.Source & Format.Block;
  file_ids?: string[];
}

type Permission = {
  role: Role;
  type: string;
};

export interface BasePageBlock extends BaseBlock {
  properties?: Properties.Title;
  format: Format.Page & Format.Access & Format.Color;
  permissions: Permission[];
  file_ids?: string[];
}

export interface Page extends BasePageBlock {
  type: "page";
}

export interface Alias extends BaseBlock {
  type: "alias";
  format: Format.Alias;
}

export interface Bookmark extends BaseBlock {
  type: "bookmark";
  properties: Properties.Link & Properties.Title;
  format: Format.Color & Format.Bookmark;
}

export interface Text extends BaseTextBlock {
  type: "text";
}

export interface BulletedList extends BaseTextBlock {
  type: "bulleted_list";
}

export interface NumberedList extends BaseTextBlock {
  type: "numbered_list";
}

export interface Header extends BaseTextBlock {
  type: "header";
}

export interface SubHeader extends BaseTextBlock {
  type: "sub_header";
}

export interface SubSubHeader extends BaseTextBlock {
  type: "sub_sub_header";
}

export interface Quote extends BaseTextBlock {
  type: "quote";
}

export interface Equation extends BaseTextBlock {
  type: "equation";
}

export interface Todo extends BaseTextBlock {
  type: "to_do";
  properties: Properties.Checked & Properties.Title;
}

export interface TableOfContents extends BaseBlock {
  type: "table_of_contents";
  format?: Format.Color;
}

export interface Divider extends BaseBlock {
  type: "divider";
}

export interface ColumnList extends BaseBlock {
  type: "column_list";
}

export interface Column extends BaseBlock {
  type: "column";
  format: Format.Column;
}

export interface Callout extends BaseBlock {
  type: "callout";
  format: Format.Icon & Format.Color;
  properties: Properties.Title;
}

export interface Toggle extends BaseBlock {
  type: "toggle";
  properties: Properties.Title;
}

export interface Image extends BaseContentBlock {
  type: "image";
}

export interface Embed extends BaseContentBlock {
  type: "embed";
}

export interface Gist extends BaseContentBlock {
  type: "gist";
}

export interface Video extends BaseContentBlock {
  type: "video";
}

export interface Figma extends BaseContentBlock {
  type: "figma";
}

export interface Typeform extends BaseContentBlock {
  type: "typeform";
}

export interface Codepen extends BaseContentBlock {
  type: "codepen";
}

export interface Excalidraw extends BaseContentBlock {
  type: "excalidraw";
}

export interface Tweet extends BaseContentBlock {
  type: "tweet";
}

export interface Maps extends BaseContentBlock {
  type: "maps";
}

export interface Pdf extends BaseContentBlock {
  type: "pdf";
}

export interface Audio extends BaseContentBlock {
  type: "audio";
}
export interface File extends BaseBlock {
  type: "file";
  properties: Properties.FileSize & Properties.Title & Properties.Source;
  file_ids?: string[];
}

export interface GoogleDrive extends BaseContentBlock {
  type: "drive";
  format: Format.Block & Format.Drive;
  file_ids?: string[];
}

export interface Code extends BaseBlock {
  type: "code";
  properties: Properties.Caption & Properties.Title & Properties.Language;
}

export interface CollectionView extends BaseContentBlock {
  type: "collection_view";
  collection_id: ID;
  view_ids: ID[];
}

export interface CollectionViewPage extends BasePageBlock {
  type: "collection_view_page";
  collection_id: ID;
  view_ids: ID[];
}

export interface Sync extends BaseBlock {
  type: "transclusion_container";
}

export interface SyncPointer extends BaseBlock {
  type: "transclusion_reference";

  format: Format.TransclusionReference;
}
