import { PropertyID } from "../";

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
  property?: PropertyID;
}

export interface CoverFormatTemplate {
  cover: Cover;
  cover_size: CoverSize;
  cover_aspect: CoverAspect;
}
