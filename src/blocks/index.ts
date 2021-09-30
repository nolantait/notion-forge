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
import type { Components, Blocks } from "@types";

export type Presenter<T> = Components.Presenter<T>;
export type ID = Blocks.ID;
export type BlockType = Blocks.BlockType;

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
