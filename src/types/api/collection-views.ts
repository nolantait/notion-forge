import { Collections, Core, Blocks } from "./";
import { Properties, Card } from "./collections";
/** Types of collection views supported by Notion */

export type ID = Core.ID;

export type ViewType = "table" | "gallery" | "list" | "board" | "calendar";

export type AnyView =
  | TableView
  | GalleryView
  | ListView
  | BoardView
  | CalendarView;

export type ViewProperty = Properties.Identity &
  Properties.Width &
  Properties.Visible;

interface BaseView extends Core.Identity {
  id: ID;
  type: ViewType;
  name: string;
  query2?: ViewQuery;
  page_sort?: Blocks.ID[];
  format?: AnyView["format"];
}

export type GalleryProperty = Pick<ViewProperty, "visible" | "property">;
export interface GalleryView extends BaseView {
  type: "gallery";
  format?: {
    gallery_cover?: Card.Cover;
    gallery_cover_size?: Card.CoverSize;
    gallery_cover_aspect?: Card.CoverAspect;
    gallery_properties?: GalleryProperty[];
    gallery_title_visible?: boolean;
  };
}

export type ListProperty = Pick<ViewProperty, "visible" | "property">;
export interface ListView extends BaseView {
  type: "list";
  format?: {
    list_properties?: ListProperty[];
    list_title_visible?: boolean;
  };
}

export type CalendarProperty = Pick<ViewProperty, "visible" | "property">;
export interface CalendarView extends BaseView {
  type: "calendar";
  format?: {
    calendar_cover?: Card.Cover;
    calendar_cover_size?: Card.CoverSize;
    calendar_cover_aspect?: Card.CoverAspect;
    calendar_properties?: CalendarProperty[];
    calendar_title_visible?: boolean;
  };
}

export interface TableView extends BaseView {
  type: "table";
  format?: {
    table_wrap?: boolean;
    table_properties?: ViewProperty[];
    table_title_visible?: boolean;
  };
}
export interface BoardView extends BaseView {
  type: "board";
  format?: {
    board_cover?: Card.Cover;
    board_cover_size?: Card.CoverSize;
    board_cover_aspect?: Card.CoverAspect;
    board_properties?: ViewProperty[];
    board_groups2?: BoardGroup[];
    board_title_visible?: boolean;
  };
}

export type BoardGroup = {
  property: Core.PropertyID;
  hidden: boolean;
  value: {
    type: Collections.Schema.PropertyType;
    value?: string;
  };
};

export type ViewQuery = {
  filter?: Filter;
  aggregate?: Aggregate;
  aggregations?: Aggregation[];
  group_by?: Core.PropertyID;
  sort?: Sort[];
  calendar_by?: Core.PropertyID;
};

type Sort = {
  id: Core.ID;
  type: Collections.Schema.PropertyType;
  property: Core.PropertyID;
  direction: "ascending" | "descending";
};

type AggregationType =
  | "count"
  | "not_empty"
  | "unique"
  | "date_range"
  | "percent_checked";
type Aggregate = {
  id: string;
  type: Collections.Schema.PropertyType;
  aggregation_type: AggregationType;
  property: Core.PropertyID;
  view_type: ViewType;
};

type Aggregation = {
  property?: Core.PropertyID;
  aggregator: AggregationType;
};

type Filter = {
  operator?:
    | "and"
    | "or"
    | "is_not_empty"
    | "is_empty"
    | "checkbox_is"
    | "enum_contains"
    | "number_greater_than"
    | "date_is_on_or_after";
  filters?: Filter[];
  filter?: Filter;
  value?: {
    type: "exact" | "relative";
    value: boolean | number | string;
  };
  property?: Core.PropertyID;
};
