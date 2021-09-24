import type { Blocks, Core, Formats, Formulas } from "./";

import type * as Card from "./collections/cards";
import type * as Properties from "./collections/properties";
import type * as Query from "./collections/queries";

import { Collections, Utils } from "@types";

export type { Properties };
export type { Card };
export type { Query };

export type ID = Core.ID;
export type ViewID = Core.ID;

/** Types of collection views supported by Notion */

export type ViewType = "table" | "gallery" | "list" | "board" | "calendar";

export type CollectionMap = Core.NotionMap<Collection>;
export type ViewMap = Core.NotionMap<View>;

export type View = Core.Identity & {
  type: ViewType;
  name: string;
  format: Record<string, any>;
  query?: unknown;
  query2: Query.ViewQuery;
};

export type AnyView =
  | TableView
  | GalleryView
  | ListView
  | BoardView
  | CalendarView;

export type GalleryView = ViewTemplate<"gallery">;
export type ListView = ViewTemplate<"list">;
export type CalendarView = ViewTemplate<"calendar">;
export type TableView = ViewTemplate<"table"> & {
  page_sort: Blocks.ID[];
  format: {
    table_wrap: boolean;
    table_properties: Properties.Identity & Properties.Width;
  };
};
export type BoardView = ViewTemplate<"board"> & {
  format: {
    board_properties: Properties.Default[];
    board_groups2: BoardGroup[];
    board_columns: BoardColumn[];
  };
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

// Generics
type ViewTemplate<T extends ViewType> = Utils.Merge<
  View,
  {
    type: T;
    format: TFormat<T>;
  }
>;

// Private Generics
type TFormat<T extends ViewType> = Utils.Prefix<TCoverFormat, T> &
  Utils.Prefix<TProperties, T>;
type TCoverFormat = {
  cover: Collections.Card.Cover;
  cover_size: Collections.Card.CoverSize;
  cover_aspect: Collections.Card.CoverAspect;
};
type TProperties = {
  properties: Properties.Default[];
};
