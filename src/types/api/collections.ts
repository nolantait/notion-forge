import type { Core, Formats } from "./";

import type * as Card from "./collections/cards";
import type * as Properties from "./collections/properties";
import type * as Schema from "./collections/schema";

export type { Properties };
export type { Card };
export type { Schema };

export type ID = Core.ID;
export type ViewID = Core.ID;

export type CollectionSchema = {
  [key: Properties.ID]: Schema.AnyDefinition;
};

export interface Collection extends Core.Identity, Core.Attachable {
  name: Formats.Decoration[];
  schema: CollectionSchema;
  description?: Formats.Decoration[];
  icon?: string;
  cover?: string;
  copied_from?: ID;
  template_pages?: ID[];
  migrated?: boolean;
  format?: Format;
}

export type Format = FormatMap & {
  collection_cover_position?: number;
  collection_page_properties?: PageProperty[];
  property_visibility?: PropertyVisibility[];
};

type PropertyVisibility = Properties.Identity & Properties.Visibility;
export type PageProperty = Properties.Identity & Properties.Visible;

type FormatMap = {
  [key: string]: Properties.Identity & Properties.Visibility;
};
