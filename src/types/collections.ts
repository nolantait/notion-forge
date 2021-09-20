import { Core, Formats, Formulas } from "./";

import * as Card from "./collections/cards";
import * as Properties from "./collections/properties";
import * as Query from "./collections/queries";

export { Properties };
export { Card };

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

type GalleryView = ViewTemplates["gallery"];

type ListView = ViewTemplates["list"];

type CalendarView = ViewTemplates["calendar"];

type TableView = ViewTemplates["table"] & {
  page_sort: ID[];
  format: {
    table_wrap: boolean;
    table_properties: Properties.Identity & Properties.Width;
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

type BoardView = ViewTemplates["board"] & {
  format: {
    board_properties: Properties.Default[];
    board_groups2: BoardGroup[];
    board_columns: BoardColumn[];
  };
};

export type AnyView =
  | TableView
  | GalleryView
  | ListView
  | BoardView
  | CalendarView;

export interface SelectOption {
  id: ID;
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

export type Prefix<T, S extends ViewType> = {
  [K in keyof T as `${S}_${string & K}`]: T[K];
};
export type GenerateCoverFormat<S extends ViewType> = Prefix<
  Card.CoverFormatTemplate,
  S
>;
export type GeneratePropertiesFormat<S extends ViewType> = Prefix<
  PropertiesTemplate,
  S
>;

type GenerateView<S extends ViewType> = View & {
  type: S;
  format: GenerateCoverFormat<S> & GeneratePropertiesFormat<S>;
};

type ViewTemplates = {
  [Key in ViewType]: GenerateView<Key>;
};
