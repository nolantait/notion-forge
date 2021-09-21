import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

import type { Core, Collections } from "./";

import type { Merge, Simplify } from "type-fest";

export type { Properties };
export type { Format };

export type ID = Core.ID;
export type BlockMap = Core.NotionMap<Any>;
export type BlockType = PageTypes | TextTypes | ContentTypes | BaseTypes;
export type Any =
  | Page
  | CollectionViewPage
  | Text
  | BulletedList
  | NumberedList
  | Header
  | SubHeader
  | SubSubHeader
  | Quote
  | Equation
  | TableOfContents
  | Todo
  | Bookmark
  | Callout
  | Toggle
  | Code
  | Divider
  | ColumnList
  | Column
  | Image
  | Embed
  | Gist
  | Video
  | Figma
  | Typeform
  | Codepen
  | Excalidraw
  | Tweet
  | Maps
  | Pdf
  | Audio
  | File
  | GoogleDrive
  | Sync
  | SyncPointer
  | Alias;

type MapTypes<T> = {
  [Key in BlockType]: T extends { type: Key } ? T : never;
};

export type Container = MapTypes<Any>;

// Page Blocks
export type Page = Default["page"];
export type CollectionView = Override<
  "collection_view",
  {
    collection_id: Collections.ID;
    view_ids: Collections.ViewID[];
  }
>;

export type CollectionViewPage = Override<
  "collection_view_page",
  {
    collection_id: Collections.ID;
    view_ids: Collections.ViewID[];
  }
>;

// Text Blocks
export type Text = Default["text"];
export type BulletedList = Default["bulleted_list"];
export type NumberedList = Default["numbered_list"];
export type Header = Default["header"];
export type SubHeader = Default["sub_header"];
export type SubSubHeader = Default["sub_sub_header"];
export type Quote = Default["quote"];
export type Equation = Default["equation"];
export type TableOfContents = Default["table_of_contents"];
export type Todo = Override<"to_do", { properties: Properties.Checked }>;
export type Bookmark = Override<
  "bookmark",
  {
    properties: Properties.Link & Properties.Title;
    format: Format.Color & Format.Bookmark;
  }
>;
export type Callout = Override<
  "callout",
  {
    format: Format.Icon;
  }
>;
export type Toggle = Override<"toggle", { properties: Properties.Title }>;
export type Code = Override<
  "code",
  { properties: Properties.Caption & Properties.Title & Properties.Language }
>;

// Misc Blocks
export type Divider = Default["divider"];
export type ColumnList = Default["column_list"];
export type Column = Override<"column", { format: Format.Column }>;

// Asset Blocks
export type Image = Default["image"];
export type Embed = Default["embed"];
export type Gist = Default["gist"];
export type Video = Default["video"];
export type Figma = Default["figma"];
export type Typeform = Default["typeform"];
export type Codepen = Default["codepen"];
export type Excalidraw = Default["excalidraw"];
export type Tweet = Default["tweet"];
export type Maps = Default["maps"];
export type Pdf = Default["pdf"];
export type Audio = Default["audio"];
export type File = Core.Attachable &
  Override<
    "file",
    { properties: Properties.FileSize & Properties.Title & Properties.Source }
  >;
export type GoogleDrive = Core.Attachable &
  Override<"drive", { format: Format.Block & Format.Drive }>;

// Sync Blocks
export type Sync = Default["transclusion_container"];
export type SyncPointer = Override<
  "transclusion_reference",
  {
    format: Format.TransclusionReference;
  }
>;
export type Alias = Override<
  "alias",
  {
    format: Format.Alias;
  }
>;

/**
 * Base properties shared by all blocks.
 */
type PageBlocks = BuildBlocks<PageTypes, PageBlock>;
type ContentBlocks = BuildBlocks<ContentTypes, ContentBlock>;
type TextBlocks = BuildBlocks<TextTypes, TextBlock>;
type BaseBlocks = BuildBlocks<BaseTypes>;
type Default = PageBlocks & ContentBlocks & BaseBlocks & TextBlocks;
type Renderable = Core.Identity & Core.Creatable & Core.Editable;

interface Block extends Renderable {
  type: never;
  properties?: never;
  format?: never;
  content?: never;
}
interface TextBlock {
  properties: Properties.Title;
  format: Format.Color;
}
interface ContentBlock {
  properties: Properties.Source & Properties.Caption;
  format: Format.Source & Format.Block;
}
interface PageBlock extends Core.Attachable {
  content?: ID[];
  properties: Properties.Title;
  format: Format.Page & Format.Access & Format.Color;
  permissions: Core.Permission[];
}

// Type Factory
type Build<T> = Merge<Block, T>;
type BuildBlocks<K extends string, T = Record<string, unknown>> = {
  [Key in K]: Merge<Build<T>, { type: Key }>;
};
type Override<T extends keyof Default, U> = Simplify<Default[T] & U>;

type PageTypes = "page" | "collection_view_page";
type TextTypes =
  | "bookmark"
  | "text"
  | "bulleted_list"
  | "numbered_list"
  | "header"
  | "sub_header"
  | "sub_sub_header"
  | "quote"
  | "equation"
  | "to_do"
  | "table_of_contents"
  | "callout"
  | "toggle"
  | "code";

type ContentTypes =
  | "collection_view"
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
  | "file";

type BaseTypes = PointerTypes | PositionTypes;
type PointerTypes =
  | "alias"
  | "transclusion_container"
  | "transclusion_reference";
type PositionTypes = "column" | "column_list" | "divider";
