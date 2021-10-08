import { Formats, Core } from "../";

export type Any =
  | Identity
  | Title
  | Source
  | Caption
  | Link
  | FileSize
  | Language
  | Checked;

export type Title = {
  title?: Formats.Decoration[];
};

export type Source = {
  source: Formats.Decoration[];
};

export type Caption = {
  caption?: Formats.Decoration[];
};

export type Link = {
  link?: Formats.Decoration[];
  description?: Formats.Decoration[];
};

export type FileSize = {
  size?: Formats.Decoration[];
};

export type Language = {
  language: Formats.Decoration[];
};

type IsChecked = "Yes" | "No";

export type Checked = {
  checked?: [IsChecked][];
};

export type Identity = {
  id: Core.PropertyID;
};
