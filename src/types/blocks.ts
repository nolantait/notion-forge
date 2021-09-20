import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

import { Core, Collections } from "./";

export { Properties };
export { Format };

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

export type AnyContent = Core.Intersection<Any, BaseContentBlock>;
export type AnyText = Core.Intersection<Any, BaseTextBlock>;
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
type Block<P, F> = Core.Identity &
  Core.Creatable &
  Core.Editable &
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

type BlockFrom<B, T> = B & { type: T };

export type Page = BlockFrom<BasePage, "page">;

export type Alias = BlockFrom<BaseBlock, "alias"> & {
  format: Format.Alias;
};

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
  collection_id: Collections.ID;
  view_ids: Collections.ViewID[];
}

export interface CollectionViewPage extends BasePageBlock {
  type: "collection_view_page";
  collection_id: Collections.ID;
  view_ids: Collections.ViewID[];
}

export interface Sync extends BaseBlock {
  type: "transclusion_container";
}

export interface SyncPointer extends BaseBlock {
  type: "transclusion_reference";
  format: Format.TransclusionReference;
}
