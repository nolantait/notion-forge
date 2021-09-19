import {
  ID,
  Decoration,
  Color,
  NumberFormat,
  PropertyID,
  PropertyType,
  Formulas,
  NotionMap,
} from "./";

/** Types of collection views supported by Notion */

export type ViewType = "table" | "gallery" | "list" | "board" | "calendar";

export type CoverType =
  | "page_cover"
  | "page_content"
  | "property"
  | "none"
  | "file";

export type CollectionMap = NotionMap<Collection>;

export type ViewMap = NotionMap<View>;

export type CardCoverSize = "small" | "medium" | "large";

export type CardCoverAspect = "cover" | "contain";

export interface BaseView {
  id: ID;
  type: ViewType;
  name: string;
  format: any;
  version: number;
  alive: boolean;
  parent_id: ID;
  parent_table: string;
  query?: any;
  query2: {
    // TODO
    filter?: any;
    aggregations?: object[];
    group_by: PropertyID;
  };
}

export interface TableView extends BaseView {
  type: "table";
  page_sort: ID[];
  format: {
    table_wrap: boolean;
    table_properties: Array<{
      property: PropertyID;
      visible: boolean;
      width: number;
    }>;
  };
}

export interface GalleryView extends BaseView {
  type: "gallery";
  format: {
    gallery_cover: CardCover;

    gallery_cover_size: CardCoverSize;

    gallery_cover_aspect: CardCoverAspect;

    gallery_properties: Array<{
      property: PropertyID;

      visible: boolean;
    }>;
  };
}

export interface ListView extends BaseView {
  type: "list";
  format: {
    list_properties: Array<{
      property: PropertyID;

      visible: boolean;
    }>;
  };
}

export interface CardCover {
  type: CardCoverType;

  property?: PropertyID;
}

export interface BoardView extends BaseView {
  type: "board";

  format: {
    board_cover: CardCover;
    board_cover_size: CardCoverSize;
    board_cover_aspect: CardCoverAspect;
    board_properties: Array<{
      property: PropertyID;
      visible: boolean;
    }>;

    board_groups2: Array<{
      property: PropertyID;
      hidden: boolean;
      value: {
        type: PropertyType;
        value: string;
        // TODO: needs testing for more cases
      };
    }>;

    board_columns: Array<{
      property: PropertyID;
      hidden: boolean;
      value: {
        type: PropertyType;
        value: string;
        // TODO: needs testing for more cases
      };
    }>;
  };
}

export interface CalendarView extends BaseView {
  type: "calendar";

  // TODO
}

export type View =
  | TableView
  | GalleryView
  | ListView
  | BoardView
  | CalendarView;

export interface SelectOption {
  id: ID;
  color: Color;
  value: string;
}

export interface PropertySchema {
  name: string;
  type: PropertyType;
  options?: SelectOption[];
  number_format?: NumberFormat;
  formula?: Formulas.Formula;
}

export interface PropertySchemaMap {
  [key: string]: PropertySchema;
}

export interface Collection {
  id: ID;
  version: number;
  name: Decoration[];
  schema: PropertySchemaMap;
  icon: string;
  parent_id: ID;
  parent_table: string;
  alive: boolean;
  copied_from: string;
  template_pages?: Array<ID>;
  format?: {
    collection_page_properties?: Array<{
      property: PropertyID;
      visible: boolean;
    }>;
    property_visibility?: Array<{
      property: PropertyID;
      visibility: "show" | "hide";
    }>;
  };
}
