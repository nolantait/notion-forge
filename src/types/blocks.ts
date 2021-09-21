import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

import type { Core, Collections } from "./";

export type { Properties };
export type { Format };

export type ID = Core.ID;
export type BlockMap = Core.NotionMap<Any>;

export type BlockType =
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

export type AnyContent = Core.Intersection<Any, BaseContent>;
export type AnyText = Core.Intersection<Any, BaseText>;
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

type WithProperties<T> = { properties?: T };
type WithFormat<T> = { format?: T };
type WithContent = { content?: ID[] };
type As<T extends BlockType> = { type: T };
type Recordable = Core.Identity & Core.Creatable & Core.Editable;
type Block<P, F> = Recordable &
  WithContent &
  As<BlockType> &
  WithFormat<F> &
  WithProperties<P>;

type BaseBlock = Block<Properties.Any, Format.Any>;
type BaseText = Block<Properties.Title, Format.Color>;
type BaseContent = Block<
  Properties.Source & Properties.Caption,
  Format.Source & Format.Block
>;
type BasePage = Block<
  Properties.Title,
  Format.Page & Format.Access & Format.Color
> &
  Core.Attachable & {
    permissions: Core.Permission[];
  };

type Empty = Record<string, unknown>;
type Templates = BaseText | BaseContent | BasePage | BaseBlock;
type BlockFrom<B extends Templates, T extends BlockType, U = Empty> = B & {
  type: T;
} & U;

// Page Blocks
export type Page = BlockFrom<BasePage, "page">;
export type CollectionView = BlockFrom<
  BaseContent,
  "collection_view",
  {
    collection_id: Collections.ID;
    view_ids: Collections.ViewID[];
  }
>;
export type CollectionViewPage = BlockFrom<
  BasePage,
  "collection_view_page",
  {
    collection_id: Collections.ID;
    view_ids: Collections.ViewID[];
  }
>;

// Text Blocks
export type Text = BlockFrom<BaseText, "text">;
export type BulletedList = BlockFrom<BaseText, "bulleted_list">;
export type NumberedList = BlockFrom<BaseText, "numbered_list">;
export type Header = BlockFrom<BaseText, "header">;
export type SubHeader = BlockFrom<BaseText, "sub_header">;
export type SubSubHeader = BlockFrom<BaseText, "sub_sub_header">;
export type Quote = BlockFrom<BaseText, "quote">;
export type Equation = BlockFrom<BaseText, "equation">;
export type TableOfContents = BlockFrom<BaseText, "table_of_contents">;
export type Todo = BlockFrom<
  BaseText,
  "to_do",
  { properties: Properties.Checked }
>;
export type Bookmark = BlockFrom<
  BaseText,
  "bookmark",
  {
    properties: Properties.Link & Properties.Title;
    format: Format.Color & Format.Bookmark;
  }
>;
export type Callout = BlockFrom<
  BaseText,
  "callout",
  {
    format: Format.Icon;
  }
>;
export type Toggle = BlockFrom<
  BaseText,
  "toggle",
  { properties: Properties.Title }
>;
export type Code = BlockFrom<
  BaseText,
  "code",
  { properties: Properties.Caption & Properties.Title & Properties.Language }
>;

// Misc Blocks
export type Divider = BlockFrom<BaseBlock, "divider">;
export type ColumnList = BlockFrom<BaseBlock, "column_list">;
export type Column = BlockFrom<BaseBlock, "column", { format: Format.Column }>;

// Asset Blocks
export type Image = BlockFrom<BaseContent, "image">;
export type Embed = BlockFrom<BaseContent, "embed">;
export type Gist = BlockFrom<BaseContent, "gist">;
export type Video = BlockFrom<BaseContent, "video">;
export type Figma = BlockFrom<BaseContent, "figma">;
export type Typeform = BlockFrom<BaseContent, "typeform">;
export type Codepen = BlockFrom<BaseContent, "codepen">;
export type Excalidraw = BlockFrom<BaseContent, "excalidraw">;
export type Tweet = BlockFrom<BaseContent, "tweet">;
export type Maps = BlockFrom<BaseContent, "maps">;
export type Pdf = BlockFrom<BaseContent, "pdf">;
export type Audio = BlockFrom<BaseContent, "audio">;
export type File = BlockFrom<
  BaseBlock & Core.Attachable,
  "file",
  { properties: Properties.FileSize & Properties.Title & Properties.Source }
>;
export type GoogleDrive = BlockFrom<
  BaseContent & Core.Attachable,
  "drive",
  { format: Format.Block & Format.Drive }
>;

// Sync Blocks
export type Sync = BlockFrom<BaseBlock, "transclusion_container">;
export type SyncPointer = BlockFrom<
  BaseBlock,
  "transclusion_reference",
  {
    format: Format.TransclusionReference;
  }
>;
export type Alias = BlockFrom<
  BaseBlock,
  "alias",
  {
    format: Format.Alias;
  }
>;
