import * as Formats from "../formats";

export type Any =
  | Title
  | Source
  | Caption
  | Link
  | FileSize
  | Language
  | Checked;

export type Title = {
  title: Formats.Decoration[];
};

export type Source = {
  source: string[][];
};

export type Caption = {
  caption?: Formats.Decoration[];
};

export type Link = {
  link: Formats.Decoration[];
  description: Formats.Decoration[];
};

export type FileSize = {
  size: Formats.Decoration[];
};

export type Language = {
  language: Formats.Decoration[];
};

export type Checked = {
  checked: (["Yes"] | ["No"])[];
};
