import { Option } from "excoptional";
import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

import { Decorated } from "@entities";

import type { Formats, Utils, Core, Collections } from "./";

export type { Properties };
export type { Format };

export type ID = Core.ID;
export type BlockMap = Core.NotionMap<Every>;
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

export type Any = BaseBlock;
export type Every =
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

type Lift<T, Key extends keyof T> = {
  [K in keyof T[Key] as Utils.CamelCase<K>]: T[Key][K] extends
    | Formats.Decoration[]
    | undefined
    ? Option<Decorated>
    : Option<T[Key][K]>;
};

// type Test = Utils.Simplify<Template<Code>>;

export type Template<T extends BaseBlock> = Required<
  Lift<T, "properties"> & Lift<T, "format">
>;

type NarrowBy<T, U> = T extends Partial<U> ? T : never;
export type WithTrait<T> = NarrowBy<Every, T>;

//type Test = WithTrait<{format: Format.Block} & {properties: Properties.Title}>;

export interface Alias extends BaseBlock {
  type: "alias";
  format: Format.Alias;
}
export interface Audio extends ContentBlock {
  type: "audio";
}
export interface Bookmark extends TextBlock {
  type: "bookmark";
  properties: Properties.Caption & Properties.Link & Properties.Title;
  format: Format.Color & Format.Bookmark;
}
export interface BulletedList extends TextBlock {
  type: "bulleted_list";
}
export interface Callout extends TextBlock {
  type: "callout";
  format: Format.Icon & Format.Color;
}
export interface Column extends BaseBlock {
  type: "column";
  format: Format.Column;
}
export interface ColumnList extends BaseBlock {
  type: "column_list";
}
export interface Code extends TextBlock {
  type: "code";
  properties: Properties.Caption & Properties.Title & Properties.Language;
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
export interface Divider extends BaseBlock {
  type: "divider";
}
export interface Drive extends ContentBlock, Core.Attachable {
  type: "drive";
  format: Format.Block & Format.Drive;
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
export interface File extends ContentBlock {
  type: "file";
  properties: Properties.Caption &
    Properties.FileSize &
    Properties.Title &
    Properties.Source;
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
  format?: Format.Color;
}
export interface Text extends TextBlock {
  type: "text";
}
export interface TransclusionReference extends BaseBlock {
  type: "transclusion_reference";
  format: Format.TransclusionReference;
}
export interface TransclusionContainer extends BaseBlock {
  type: "transclusion_container";
}
export interface Todo extends TextBlock {
  type: "to_do";
  properties: Properties.Title & Properties.Checked;
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

interface BaseBlock extends Core.Identity, Core.Creatable, Core.Editable {
  type: BlockType;
  content?: ID[];
  properties?: Properties.Any;
  format?: Format.Any;
}
interface TextBlock extends BaseBlock {
  properties?: Properties.Title;
  format?: Format.Color;
}
interface ContentBlock extends BaseBlock {
  properties?: Properties.Source & Properties.Caption;
  format?: Format.Source & Format.Block;
}
interface PageBlock extends BaseBlock {
  properties: Properties.Title;
  format?: Format.Page & Format.Access & Format.Color & Format.Icon;
  permissions?: Core.Permission[];
  file_ids?: string[];
}
