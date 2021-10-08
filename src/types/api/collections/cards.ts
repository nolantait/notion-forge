import { Core } from "@types";

export type CoverType =
  | "page_cover"
  | "page_content"
  | "property"
  | "none"
  | "file";

export type CoverSize = "small" | "medium" | "large";

export type CoverAspect = "cover" | "contain";

export type CoverPosition = number;

export interface Cover {
  type: CoverType;
  property?: Core.PropertyID;
}
