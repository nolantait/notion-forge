import type { Blocks, Core, Formats, Formulas } from "./";

import type * as Card from "./collections/cards";
import type * as Properties from "./collections/properties";
import type * as Query from "./collections/queries";

export type { Properties };
export type { Card };

export type ID = Core.ID;
export type ViewID = Core.ID;

/** Types of collection views supported by Notion */

export type ViewType = "table" | "gallery" | "list" | "board" | "calendar";

export type CollectionMap = Core.NotionMap<Collection>;
export type ViewMap = Core.NotionMap<View>;

export type View = Core.Identity & {
  type: ViewType;
  name: string;
  format: unknown;
  query?: unknown;
  query2: Query.ViewQuery;
};

export type AnyView =
  | TableView
  | GalleryView
  | ListView
  | BoardView
  | CalendarView;

type GalleryView = ViewTemplate<"gallery">;
type ListView = ViewTemplate<"list">;
type CalendarView = ViewTemplate<"calendar">;
type TableView = ViewTemplate<"table"> & {
  page_sort: Blocks.ID[];
  format: {
    table_wrap: boolean;
    table_properties: Properties.Identity & Properties.Width;
  };
};
type BoardView = ViewTemplate<"board"> & {
  format: {
    board_properties: Properties.Default[];
    board_groups2: BoardGroup[];
    board_columns: BoardColumn[];
  };
};

type BoardGroupValue = {
  type: Core.PropertyType;
  value: string;
  // TODO: needs testing for more cases
};

type BoardGroup = {
  value: BoardGroupValue;
} & Properties.Identity &
  Properties.Hidden;

type BoardColumn = {
  property: Core.PropertyID;
  hidden: boolean;
  value: BoardGroupValue;
};

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
  formula?: Formulas.Formula;
};

export type PropertySchemaMap = {
  [key: string]: PropertySchema;
};

export type Collection = Core.Identity & {
  name: Formats.Decoration[];
  schema: PropertySchemaMap;
  icon: string;
  copied_from: ID;
  template_pages?: ID[];
  format?: {
    collection_page_properties?: Properties.Default[];
    property_visibility?: Properties.Identity & Properties.Visible[];
  };
};

// Generics
type PropertiesTemplate = {
  properties: Properties.Default[];
};
type Prefix<T, S extends ViewType> = {
  [K in keyof T as `${S}_${string & K}`]: T[K];
};
type Cover<S extends ViewType> = Prefix<Card.CoverFormatTemplate, S>;
type Properties<S extends ViewType> = Prefix<PropertiesTemplate, S>;
type Format<S extends ViewType> = Properties<S> & Cover<S>;
type ViewTemplate<S extends ViewType> = View & {
  type: S;
  format: Format<S>;
};
