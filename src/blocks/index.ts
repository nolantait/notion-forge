import * as Alias from "./alias";
import * as Audio from "./audio";
import * as Bookmark from "./bookmark";
import * as BulletedList from "./bulleted-list";
import * as Callout from "./callout";
import * as Code from "./code";
import * as Codepen from "./codepen";
import * as CollectionViewPage from "./collection-view-page";
import * as CollectionView from "./collection-view";
import * as ColumnList from "./column-list";
import * as Column from "./column";
import * as Divider from "./divider";
import * as Drive from "./drive";
import * as Embed from "./embed";
import * as Equation from "./equation";
import * as Excalidraw from "./excalidraw";
import * as Figma from "./figma";
import * as File from "./file";
import * as Gist from "./gist";
import * as Header from "./header";
import * as Image from "./image";
import * as Maps from "./maps";
import * as NumberedList from "./numbered-list";
import * as Page from "./page";
import * as Pdf from "./pdf";
import * as Quote from "./quote";
import * as SubHeader from "./sub-header";
import * as SubSubHeader from "./sub-sub-header";
import * as TableOfContents from "./table-of-contents";
import * as Text from "./text";
import * as Todo from "./todo";
import * as Toggle from "./toggle";
import * as TransclusionContainer from "./transclusion-container";
import * as TransclusionReference from "./transclusion-reference";
import * as Tweet from "./tweet";
import * as Typeform from "./typeform";
import * as Video from "./video";

export { List } from "./list";
export { Heading } from "./heading";
import type { Api, Domain } from "@types";
import type { Decorated } from "@entities";
import type { Option } from "excoptional";

export type ID = Api.Blocks.ID;
export type BlockType = Api.Blocks.BlockType;

type OptionalPropertyNames<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

type RequiredPropertyNames<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

type OptionalProperties<T> = Required<Pick<T, OptionalPropertyNames<T>>>;
type RequiredProperties<T> = Pick<T, RequiredPropertyNames<T>>;

type Map<Value> = Value extends Api.Formats.Decoration[] ? Decorated : Value;
type WrapOptional<T> = {
  [K in keyof OptionalProperties<T>]: Option<NonNullable<T[K]>>;
};
type WrapRequired<T> = {
  [K in keyof RequiredProperties<T>]: Option<NonNullable<T[K]>>;
};
type Wrap<T> = WrapOptional<T> & WrapRequired<T>;

type Lift<T, Key extends keyof T> = {
  [K in keyof T[Key] as Domain.Utils.CamelCase<K>]: Map<T[Key][K]>;
};

// type Test = Template<Api.Blocks.Alias>;
export type Template<T extends Api.Blocks.Any> = Domain.Utils.Merge<
  Wrap<Lift<Required<T>, "properties">>,
  Wrap<Lift<Required<T>, "format">>
>;

export {
  Alias,
  Audio,
  Bookmark,
  BulletedList,
  Callout,
  Code,
  Codepen,
  CollectionViewPage,
  CollectionView,
  ColumnList,
  Column,
  Divider,
  Drive,
  Embed,
  Equation,
  Excalidraw,
  Figma,
  File,
  Gist,
  Header,
  Image,
  Maps,
  NumberedList,
  Page,
  Pdf,
  Quote,
  SubHeader,
  SubSubHeader,
  TableOfContents,
  Text,
  Todo,
  Toggle,
  TransclusionContainer,
  TransclusionReference,
  Tweet,
  Typeform,
  Video,
};

export type Any =
  | Alias.Entity
  | Audio.Entity
  | Bookmark.Entity
  | BulletedList.Entity
  | Callout.Entity
  | Code.Entity
  | Codepen.Entity
  | CollectionViewPage.Entity
  | CollectionView.Entity
  | ColumnList.Entity
  | Column.Entity
  | Divider.Entity
  | Drive.Entity
  | Embed.Entity
  | Equation.Entity
  | Excalidraw.Entity
  | Figma.Entity
  | File.Entity
  | Gist.Entity
  | Header.Entity
  | Image.Entity
  | Maps.Entity
  | NumberedList.Entity
  | Page.Entity
  | Pdf.Entity
  | Quote.Entity
  | SubHeader.Entity
  | SubSubHeader.Entity
  | TableOfContents.Entity
  | Text.Entity
  | Todo.Entity
  | Toggle.Entity
  | TransclusionContainer.Entity
  | TransclusionReference.Entity
  | Tweet.Entity
  | Typeform.Entity
  | Video.Entity;
