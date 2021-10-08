import { Core, Formulas } from "../";

export type AnyDefinition =
  | Checkbox
  | CreatedTime
  | CreatedBy
  | Date
  | Email
  | Formula
  | File
  | LastEditedTime
  | LastEditedBy
  | MultiSelect
  | Number
  | Person
  | PhoneNumber
  | Relation
  | Select
  | Title
  | Text
  | Url;

interface BaseDefinition {
  name: string;
  type: PropertyType;
}

interface Selectable extends BaseDefinition {
  options?: SelectOption[];
}

export interface Checkbox extends BaseDefinition {
  type: "checkbox";
}

export interface CreatedTime extends BaseDefinition {
  type: "created_time";
}

export interface CreatedBy extends BaseDefinition {
  type: "created_by";
}

export interface Date extends BaseDefinition {
  type: "date";
}

export interface Email extends BaseDefinition {
  type: "email";
}

export interface Formula extends BaseDefinition {
  type: "formula";
  formula?: Formulas.Any;
}

export interface File extends BaseDefinition {
  type: "file";
}

export interface LastEditedTime extends BaseDefinition {
  type: "last_edited_time";
}

export interface LastEditedBy extends BaseDefinition {
  type: "last_edited_by";
}

export interface MultiSelect extends BaseDefinition, Selectable {
  type: "multi_select";
}

export interface Number extends BaseDefinition {
  type: "number";
  number_format?: NumberFormat;
}

export interface Person extends BaseDefinition {
  type: "person";
}

export interface PhoneNumber extends BaseDefinition {
  type: "phone_number";
}

export interface Relation extends BaseDefinition {
  type: "relation";
  property: Core.PropertyID;
  collection_id: Core.ID;
}

export interface Select extends BaseDefinition, Selectable {
  type: "select";
}

export interface Title extends BaseDefinition {
  type: "title";
}

export interface Text extends BaseDefinition {
  type: "text";
}

export interface Url extends BaseDefinition {
  type: "url";
}

export interface SelectOption {
  id: Core.PropertyID;
  color: Core.Color;
  value: string;
}

/** Types of number formatting supported by Notion */
export type NumberFormat =
  | "number_with_commas"
  | "percent"
  | "dollar"
  | "euro"
  | "pound"
  | "yen"
  | "rupee"
  | "won"
  | "yuan";

/** Types of structured data supported by Notion collections */
export type PropertyType =
  | "checkbox"
  | "created_time"
  | "created_by"
  | "date"
  | "email"
  | "file"
  | "formula"
  | "last_edited_time"
  | "last_edited_by"
  | "multi_select"
  | "number"
  | "person"
  | "phone_number"
  | "relation"
  | "select"
  | "title"
  | "text"
  | "url";
