import { Decoration } from "./formatting";

export type PropertyID = string;

/** Types of structured data supported by Notion collections */

export type PropertyType =
  | "title"
  | "text"
  | "number"
  | "select"
  | "multi_select"
  | "date"
  | "person"
  | "file"
  | "checkbox"
  | "url"
  | "email"
  | "phone_number"
  | "formula"
  | "relation"
  | "created_time"
  | "created_by"
  | "last_edited_time"
  | "last_edited_by";

export interface PropertyMap {
  [key: string]: Decoration[];
}
