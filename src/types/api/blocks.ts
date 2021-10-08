import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

import type { Formats, Core, Collections, CollectionViews } from "./";

export type { Properties };
export type { Format };

export type ID = Core.ID;
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

export type Any = DTO;
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

export interface Alias extends AbstractBlock {
  type: "alias";
  format?: Format.AliasPointer;
}

export interface Audio extends EmbeddableBlock {
  type: "audio";
}

export interface Bookmark extends AbstractBlock {
  properties?: Properties.Title & Properties.Link & Properties.Caption;
  format?: Format.Bookmark & Format.Color & Format.CopiedFromPointer;
  type: "bookmark";
}

export interface BulletedList extends TextBlock {
  content?: ID[];
  type: "bulleted_list";
}

export interface Callout extends TextBlock {
  type: "callout";
  format?: Format.Icon & Format.Color & Format.CopiedFromPointer;
}

export interface Code extends AbstractBlock {
  type: "code";
  properties?: Properties.Title & Properties.Caption & Properties.Language;
}

export interface Codepen extends EmbeddableBlock {
  type: "codepen";
}

export interface CollectionView extends CollectionBlock {
  type: "collection_view";
  query2: CollectionViews.ViewQuery;
  permissions: Core.Permission;
}

export interface CollectionViewPage extends CollectionBlock {
  type: "collection_view_page";
}

export interface Column extends AbstractBlock {
  type: "column";
  content: ID[];
  format?: Format.ColumnRatio & Format.CopiedFromPointer;
}

export interface ColumnList extends AbstractBlock {
  type: "column_list";
  content?: ID[];
  format?: Format.CopiedFromPointer;
}

export interface Divider extends AbstractBlock {
  type: "divider";
  format?: Format.CopiedFromPointer;
}

export interface Drive extends AbstractBlock, Core.Attachable {
  type: "drive";
  format?: Format.Block & Format.Drive & Format.Source;
}

export interface Equation extends TextBlock {
  type: "equation";
}

export interface Excalidraw extends EmbeddableBlock {
  type: "excalidraw";
}

export interface Embed extends EmbeddableBlock {
  type: "embed";
}

export interface File extends AbstractBlock, Core.Attachable {
  type: "file";
  properties?: Properties.Title &
    Properties.Source &
    Properties.FileSize &
    Properties.Caption;
}

export interface Figma extends EmbeddableBlock {
  type: "figma";
}

export interface Gist extends EmbeddableBlock {
  type: "gist";
}

export interface Header extends TextBlock {
  type: "header";
}

export interface Image extends EmbeddableBlock {
  type: "image";
}

export interface Maps extends EmbeddableBlock {
  type: "maps";
}

export interface NumberedList extends TextBlock {
  type: "numbered_list";
}

export interface Page extends AbstractBlock, Core.Attachable {
  properties?: PropertyMap & Properties.Title;
  format?: Format.Icon & Format.Page & Format.Access;
  content?: ID[];
  permissions?: Core.Permission;
  type: "page";
}

export interface Pdf extends EmbeddableBlock {
  properties?: Properties.Source;
  format?: Format.Block & Format.CopiedFromPointer & Format.Source;
  type: "pdf";
}

export interface Quote extends TextBlock {
  type: "quote";
}

export interface SubHeader extends TextBlock, Core.Attachable {
  type: "sub_header";
}

export interface SubSubHeader extends TextBlock, Core.Attachable {
  type: "sub_sub_header";
}

export interface TableOfContents extends AbstractBlock {
  format?: Format.Color;
  type: "table_of_contents";
}

export interface Text extends TextBlock {
  type: "text";
}

export interface Todo extends TextBlock {
  type: "to_do";
  properties?: Properties.Title & Properties.Checked;
}

export interface Toggle extends TextBlock {
  type: "toggle";
}

export interface TransclusionReference extends AbstractBlock {
  type: "transclusion_reference";
  format?: Format.TransclusionReferencePointer & Format.CopiedFromPointer;
}

export interface TransclusionContainer extends AbstractBlock {
  type: "transclusion_container";
  content?: ID[];
}

export interface Typeform extends EmbeddableBlock {
  type: "typeform";
}

export interface Tweet extends EmbeddableBlock {
  type: "tweet";
}

export interface Video extends AbstractBlock, Core.Attachable {
  properties?: Properties.Source;
  format?: Format.Block & Format.Source;
  type: "video";
}

type PropertyMap = {
  [key: string]: Formats.Decoration[];
};

interface AbstractBlock {
  id: ID;
  type: BlockType;
  version: number;
  parent_id: ID;
  parent_table: "block" | "collection" | "space";
  alive: boolean;
  space_id: ID;
  created_by_table?: "notion_user";
  created_by_id?: ID;
  last_edited_by_table?: "notion_user";
  last_edited_id?: ID;
  created_by?: ID;
  created_time?: number;
  last_edited_by?: ID;
  last_edited_time?: number;
  properties?: Properties.Any;
  format?: Format.Any;
}

interface EmbeddableBlock extends AbstractBlock, Core.Attachable {
  properties?: Properties.Source & Properties.Caption;
  format?: Format.Block & Format.CopiedFromPointer & Format.Source;
}

interface TextBlock extends AbstractBlock {
  properties?: Properties.Title;
  format?: Format.Icon & Format.Color & Format.CopiedFromPointer;
  discussions?: ID[];
  content?: ID[];
}

interface CollectionBlock extends AbstractBlock {
  collection_id: Collections.ID;
  view_ids: Collections.ViewID[];
  properties?: Properties.Title;
  format?: Format.Access &
    Format.Icon &
    Format.Page &
    Format.CollectionPointer &
    Format.CopiedFromPointer;
}
