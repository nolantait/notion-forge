import { Option } from "excoptional";
import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

import { Decorated } from "@entities";

import type { API, Formats, Utils, Core, Collections } from "./";

export type { Properties };
export type { Format };

export type ID = Core.ID;
export type BlockMap = API.NotionMap<DTO>;
export type BlockType =
  | "alias"
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
  | "transclusion_reference";

export type Any = LayoutBlock | PageBlock | ContentBlock | TextBlock;
export type DTO =
  | Alias
  | Page
  | Text
  | Bookmark
  | BulletedList
  | NumberedList
  | Header
  | SubHeader
  | SubSubHeader
  | Quote
  | Equation
  | Todo
  | TableOfContents
  | Divider
  | ColumnList
  | Column
  | Callout
  | Toggle
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
  | Drive
  | File
  | Code
  | CollectionView
  | CollectionViewPage
  | TransclusionReference
  | TransclusionContainer;

export type OptionalPropertyNames<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

export type RequiredPropertyNames<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

export type OptionalProperties<T> = Required<Pick<T, OptionalPropertyNames<T>>>;

export type RequiredProperties<T> = Pick<T, RequiredPropertyNames<T>>;

type Map<Value> = Value extends Formats.Decoration[] ? Decorated : Value;
type WrapOptional<T> = {
  [K in keyof OptionalProperties<T>]: Option<NonNullable<T[K]>>;
};
type WrapRequired<T> = {
  [K in keyof RequiredProperties<T>]: NonNullable<T[K]>;
};
type Wrap<T> = WrapOptional<T> & WrapRequired<T>;

type Lift<T, Key extends keyof T> = {
  [K in keyof T[Key] as Utils.CamelCase<K>]: Map<T[Key][K]>;
};

// type Test = Template<Page>
export type Template<T extends AbstractBlock> = Utils.Merge<
  Wrap<Lift<Required<T>, "properties">>,
  Wrap<Lift<Required<T>, "format">>
>;

type NarrowBy<T, U> = T extends U ? T : never;

//type Test = WithTrait<{ properties: Properties.Caption }>;
export type WithTrait<T> = NarrowBy<DTO, T>;

export interface Alias extends LayoutBlock {
  type: "alias";
  format: Format.Alias;
}
export interface Audio extends ContentBlock {
  type: "audio";
}

type BookmarkProperties = Properties.Caption &
  Properties.Link &
  Properties.Title;
type BookmarkFormat = Format.Color & Format.Bookmark;
export interface Bookmark extends TextBlock {
  type: "bookmark";
  properties: BookmarkProperties;
  format: BookmarkFormat;
}
export interface BulletedList extends TextBlock {
  type: "bulleted_list";
}

type CalloutFormat = Format.Icon & Format.Color;
export interface Callout extends TextBlock {
  type: "callout";
  format: CalloutFormat;
}
export interface Column extends LayoutBlock {
  type: "column";
  format: Format.Column;
}
export interface ColumnList extends LayoutBlock {
  type: "column_list";
}

type CodeProperties = Properties.Caption &
  Properties.Title &
  Properties.Language;
export interface Code extends TextBlock {
  type: "code";
  properties: CodeProperties;
}

export interface Codepen extends ContentBlock {
  type: "codepen";
}

export interface CollectionViewPage extends PageBlock {
  type: "collection_view_page";
  collection_id: Collections.ID;
  view_ids: Collections.ViewID[];
}

export interface CollectionView extends ContentBlock {
  type: "collection_view";
  collection_id: Collections.ID;
  view_ids: Collections.ViewID[];
  name: string;
  query2: Collections.Query.ViewQuery;
}

export interface Divider extends LayoutBlock {
  type: "divider";
}

type DriveFormat = Format.Block & Format.Drive;
export interface Drive extends ContentBlock, Core.Attachable {
  type: "drive";
  format: DriveFormat;
}

export interface Excalidraw extends ContentBlock {
  type: "excalidraw";
}

export interface Embed extends ContentBlock {
  type: "embed";
}

export interface Equation extends TextBlock {
  type: "equation";
}

type FileProperties = Properties.Caption &
  Properties.FileSize &
  Properties.Title &
  Properties.Source;
export interface File extends ContentBlock {
  type: "file";
  properties: FileProperties;
}

export interface Figma extends ContentBlock {
  type: "figma";
}

export interface Gist extends ContentBlock {
  type: "gist";
}

export interface Header extends TextBlock {
  type: "header";
}

export interface Image extends ContentBlock {
  type: "image";
}

export interface Maps extends ContentBlock {
  type: "maps";
}

export interface NumberedList extends TextBlock {
  type: "numbered_list";
}

export interface Page extends PageBlock {
  type: "page";
}

export interface Pdf extends ContentBlock {
  type: "pdf";
}

export interface Quote extends TextBlock {
  type: "quote";
}

export interface SubHeader extends TextBlock {
  type: "sub_header";
}

export interface SubSubHeader extends TextBlock {
  type: "sub_sub_header";
}

export interface TableOfContents extends TextBlock {
  type: "table_of_contents";
}

export interface Text extends TextBlock {
  type: "text";
}

export interface TransclusionReference extends LayoutBlock {
  type: "transclusion_reference";
  format: Format.TransclusionReference;
}

export interface TransclusionContainer extends LayoutBlock {
  type: "transclusion_container";
}

type TodoProperties = Properties.Title & Properties.Checked;
export interface Todo extends TextBlock {
  type: "to_do";
  properties: TodoProperties;
}

export interface Toggle extends TextBlock {
  type: "toggle";
}

export interface Typeform extends ContentBlock {
  type: "typeform";
}

export interface Tweet extends ContentBlock {
  type: "tweet";
}

export interface Video extends ContentBlock {
  type: "video";
}

interface AbstractBlock extends Core.Identity, Core.Creatable, Core.Editable {
  type: BlockType;
  content?: ID[];
  properties?: Properties.Any;
  format?: Format.Any;
}

interface LayoutBlock extends AbstractBlock {
  format?: Format.TransclusionReference | Format.Alias | Format.Column;
}

interface TextBlock extends AbstractBlock {
  properties?:
    | Properties.Title
    | TodoProperties
    | CodeProperties
    | BookmarkProperties;
  format?: Format.Color | CalloutFormat | BookmarkFormat;
}

interface ContentBlock extends AbstractBlock {
  properties?: Properties.Source | Properties.Caption | FileProperties;
  format?: Format.Source | Format.Block | DriveFormat;
}

interface PageBlock extends AbstractBlock {
  properties?: Properties.Title;
  format?: Format.Page | Format.Access | Format.Color | Format.Icon;
  permissions?: Core.Permission[];
  file_ids?: string[];
}
