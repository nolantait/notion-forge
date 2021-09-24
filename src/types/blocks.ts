import type * as Format from "./blocks/formats";
import type * as Properties from "./blocks/properties";

import type { Core, Collections } from "./";

export type { Properties };
export type { Format };

export type ID = Core.ID;
export type BlockMap = Core.NotionMap<Any>;
export type BlockType = keyof Default;
export type Any = Container[keyof Blocks];
export type Container = TagWithKey<"type", Blocks>;

type NarrowBy<T, U> = T extends U ? T : never;
export type WithTrait<T> = NarrowBy<Any, T>;

type TagWithKey<TagName extends string, T> = {
  [K in keyof T]: { [_ in TagName]: K } & T[K];
};

// Create blocks by overriding subsets of the default template
type Blocks = {
  [K in BlockType]: K extends keyof Override
    ? Default[K] & Override[K]
    : Default[K];
};

type Override = {
  alias: {
    format: Format.Alias;
  };
  transclusion_reference: {
    format: Format.TransclusionReference;
  };
  drive: Core.Attachable & {
    format: Format.Block & Format.Drive;
  };
  file: {
    properties: Properties.FileSize & Properties.Title & Properties.Source;
  };
  column: {
    format: Format.Column;
  };
  code: {
    properties: Properties.Caption & Properties.Title & Properties.Language;
  };
  callout: {
    format: Format.Icon;
  };
  bookmark: {
    properties: Properties.Link & Properties.Title;
    format: Format.Color & Format.Bookmark;
  };
  todo: {
    properties: Properties.Checked;
  };
  collection_view_page: {
    collection_id: Collections.ID;
    view_ids: Collections.ViewID;
  };
  collection_view: {
    collection_id: Collections.ID;
    view_ids: Collections.ViewID;
  };
};

type Default = {
  page: PageBlock;
  collection_view_page: PageBlock;
  bookmark: TextBlock;
  text: TextBlock;
  bulleted_list: TextBlock;
  numbered_list: TextBlock;
  header: TextBlock;
  sub_header: TextBlock;
  sub_sub_header: TextBlock;
  quote: TextBlock;
  equation: TextBlock;
  to_do: TextBlock;
  table_of_contents: TextBlock;
  callout: TextBlock;
  toggle: TextBlock;
  code: TextBlock;
  image: ContentBlock;
  embed: ContentBlock;
  gist: ContentBlock;
  video: ContentBlock;
  figma: ContentBlock;
  typeform: ContentBlock;
  codepen: ContentBlock;
  excalidraw: ContentBlock;
  tweet: ContentBlock;
  maps: ContentBlock;
  pdf: ContentBlock;
  audio: ContentBlock;
  drive: ContentBlock;
  file: ContentBlock;
  collection_view: CollectionBlock;
  alias: BaseBlock;
  transclusion_container: BaseBlock;
  transclusion_reference: BaseBlock;
  column: BaseBlock;
  column_list: BaseBlock;
  divider: BaseBlock;
};

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
