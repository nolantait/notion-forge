import { Formats, Core } from "../";

export type Any =
  | Title
  | Source
  | Caption
  | Link
  | FileSize
  | Language
  | Checked;

type URL = string[];

export type Title = {
  title: Formats.Decoration[];
};

export type Source = {
  source: URL[];
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

export type Identity = {
  id: Core.PropertyID;
};
