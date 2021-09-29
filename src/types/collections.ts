import type { API, Blocks, Core, Formats, Formulas } from "./";

import type * as Card from "./collections/cards";
import type * as Properties from "./collections/properties";
import type * as Query from "./collections/queries";

export type { Properties };
export type { Card };
export type { Query };

export type ID = Core.ID;
export type ViewID = Core.ID;

/** Types of collection views supported by Notion */

export type ViewType = "table" | "gallery" | "list" | "board" | "calendar";

export type CollectionMap = API.NotionMap<Collection>;
export type ViewMap = API.NotionMap<AnyView>;

export type AnyView =
  | TableView
  | GalleryView
  | ListView
  | BoardView
  | CalendarView;

interface BaseView extends Core.Identity {
  id: Blocks.ID;
  type: ViewType;
  name: string;
  query?: never;
  query2: Query.ViewQuery;
}

export type GalleryProperty = Properties.Identity & Properties.Visible;
export interface GalleryView extends BaseView {
  type: "gallery";
  format: {
    gallery_cover: Card.Cover;
    gallery_cover_size: Card.CoverSize;
    gallery_cover_aspect: Card.CoverAspect;
    gallery_properties: GalleryProperty[];
  };
}

export type ListProperty = Properties.Identity & Properties.Visible;
export interface ListView extends BaseView {
  type: "list";
  format: {
    list_properties: ListProperty[];
  };
}
export interface CalendarView extends BaseView {
  type: "calendar";
  format: Record<string, never>;
}

export type TableProperty = Properties.Identity &
  Properties.Width &
  Properties.Visible;

export interface TableView extends BaseView {
  type: "table";
  page_sort: Blocks.ID[];
  format: {
    table_wrap: boolean;
    table_properties: TableProperty[];
  };
}
export interface BoardView extends BaseView {
  type: "board";
  format: {
    board_cover: Card.Cover;
    board_cover_size: Card.CoverSize;
    board_cover_aspect: Card.CoverAspect;
    board_properties: Array<Properties.Identity & Properties.Visible>;
    board_groups2: BoardGroup[];
    board_columns: BoardColumn[];
  };
}

export interface SelectOption {
  id: Core.PropertyID;
  color: Formats.Color;
  value: string;
}

export type PropertySchema = {
  name: string;
  type: Core.PropertyType;
  options?: SelectOption[];
  number_format?: Formats.NumberFormat;
  formula?: Formulas.Any;
};

export type PropertySchemaMap = {
  [key: string]: PropertySchema;
};

export type PropertyVisibility = Array<
  Properties.Identity & Properties.Visibility
>;
export type PageProperty = Properties.Identity & Properties.Visible;
export interface Collection extends Core.Identity {
  name: Formats.Decoration[];
  schema: PropertySchemaMap;
  icon: string;
  copied_from: ID;
  template_pages?: ID[];
  format?: {
    collection_page_properties?: PageProperty[];
    property_visibility?: PropertyVisibility[];
  };
}

export type BoardGroupValue = {
  type: Core.PropertyType;
  value: string;
  // TODO: needs testing for more cases
};

export type BoardGroup = {
  property: Core.PropertyID;
  hidden: boolean;
  value: BoardGroupValue;
};

type BoardColumn = BoardGroup;
