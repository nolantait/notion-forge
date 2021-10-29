import { Core } from "./";

export type BoldSymbol = "b";
export type BoldFormat = [BoldSymbol];

export type ItalicSymbol = "i";
export type ItalicFormat = [ItalicSymbol];

export type StrikeSymbol = "s";
export type StrikeFormat = [StrikeSymbol];

export type CodeSymbol = "c";
export type CodeFormat = [CodeSymbol];

export type UnderlineSymbol = "_";
export type UnderlineFormat = [UnderlineSymbol];

export type LinkSymbol = "a";
export type LinkFormat = [LinkSymbol, Core.URL];

export type ColorSymbol = "h";
export type ColorFormat = [ColorSymbol, Core.Color];

export type UserSymbol = "u";
export type UserFormat = [UserSymbol, string];

export type PageSymbol = "p";
export type PageFormat = [PageSymbol, string];

export type InlineEquationSymbol = "e";
export type InlineEquationFormat = [InlineEquationSymbol, string];

export type DiscussionSymbol = "m";
export type DiscussionFormat = [DiscussionSymbol, string];

export type ExternalLinkSymbol = "‣";
export type ExternalLinkFormat = [ExternalLinkSymbol, UserFormat | PageFormat];

export type DateSymbol = "d";
export type DateFormat = [DateSymbol, FormattedDate];

export type FormattedDate = {
  type: "date" | "daterange";
  start_date: string;
  end_date?: string;
  date_format?: string;
};

export type SubDecorationSymbol =
  | BoldSymbol
  | ItalicSymbol
  | StrikeSymbol
  | CodeSymbol
  | UnderlineSymbol
  | LinkSymbol
  | ColorSymbol
  | DateSymbol
  | UserSymbol
  | InlineEquationSymbol
  | PageSymbol
  | ExternalLinkSymbol
  | DiscussionSymbol;

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