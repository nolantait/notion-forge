/** Block colors supported by Notion */

export type Color =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "teal"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "teal_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background";

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

export type BoldFormat = ["b"];

export type ItalicFormat = ["i"];

export type StrikeFormat = ["s"];

export type CodeFormat = ["c"];

export type UnderlineFormat = ["_"];

export type LinkFormat = ["a", string];

export type ColorFormat = ["h", Color];

export type UserFormat = ["u", string];

export type PageFormat = ["p", string];

export type InlineEquationFormat = ["e", string];

export type DiscussionFormat = ["m", string];

export type ExternalLinkFormat = ["‣", [string, string]];

export type DateFormat = ["d", FormattedDate];

export interface FormattedDate {
  type: "date" | "daterange";
  start_date: string;
  end_date?: string;
  date_format?: string;
}

export type SubDecoration =
  | BoldFormat
  | ItalicFormat
  | StrikeFormat
  | CodeFormat
  | UnderlineFormat
  | LinkFormat
  | ColorFormat
  | DateFormat
  | UserFormat
  | InlineEquationFormat
  | PageFormat
  | ExternalLinkFormat
  | DiscussionFormat;

export type BaseDecoration = [string];

export type AdditionalDecoration = [string, SubDecoration[]];

export type Decoration = BaseDecoration | AdditionalDecoration;
