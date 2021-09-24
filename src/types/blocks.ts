import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

import type { Core, Collections } from "./";

export type { Properties };
export type { Format };

export type ID = Core.ID;
export type BlockMap = Core.NotionMap<Any>;
export type BlockType = Any["type"];
export type Any =
  | Alias
  | Audio
  | Bookmark
  | BulletedList
  | Callout
  | Column
  | ColumnList
  | Code
  | Codepen
  | CollectionViewPage
  | CollectionView
  | Divider
  | Drive
  | Excalidraw
  | Embed
  | Equation
  | File
  | Figma
  | Gist
  | Header
  | Image
  | Maps
  | NumberedList
  | Page
  | Pdf
  | Quote
  | SubHeader
  | SubSubHeader
  | TableOfContents
  | Text
  | TransclusionReference
  | TransclusionContainer
  | Todo
  | Toggle
  | Typeform
  | Tweet
  | Video;

type NarrowBy<T, U> = T extends U ? T : never;
export type WithTrait<T> = NarrowBy<Any, T>;

export interface Alias extends BaseBlock {
  type: "alias";
  format: Format.Alias;
}
export interface Audio extends ContentBlock {
  type: "audio";
}
export interface Bookmark extends TextBlock {
  type: "bookmark";
  properties: Properties.Link & Properties.Title;
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
export interface CollectionView extends CollectionBlock {
  type: "collection_view";
  collection_id: Collections.ID;
  view_ids: Collections.ViewID[];
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
  properties: Properties.FileSize & Properties.Title & Properties.Source;
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

type Renderable = Core.Identity & Core.Creatable & Core.Editable;
interface BaseBlock extends Renderable {
  properties?: Record<string, unknown>;
  format?: Record<string, unknown>;
  content?: ID[];
}
interface TextBlock extends BaseBlock {
  properties: Properties.Title;
  format: Format.Color;
}
interface ContentBlock extends BaseBlock {
  properties: Properties.Source & Properties.Caption;
  format: Format.Source & Format.Block;
}
interface PageBlock extends BaseBlock {
  properties: Properties.Title;
  format: Format.Page & Format.Access & Format.Color;
  permissions: Core.Permission[];
  file_ids?: string[];
}
interface CollectionBlock extends ContentBlock {
  name: string;
  query2: Collections.Query.ViewQuery;
}
