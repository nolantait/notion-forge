import * as Blocks from "@blocks";

export type Component<T> = (props: T) => React.ReactElement;

export interface Any {
  alias: Component<Blocks.Alias.Props>;
  audio: Component<Blocks.Audio.Props>;
  bookmark: Component<Blocks.Bookmark.Props>;
  bulletedList: Component<Blocks.BulletedList.Props>;
  callout: Component<Blocks.Callout.Props>;
  column: Component<Blocks.Column.Props>;
  columnList: Component<Blocks.ColumnList.Props>;
  code: Component<Blocks.Code.Props>;
  codepen: Component<Blocks.Codepen.Props>;
  collectionViewPage: Component<Blocks.CollectionViewPage.Props>;
  collectionView: Component<Blocks.CollectionView.Props>;
  divider: Component<Blocks.Divider.Props>;
  drive: Component<Blocks.Drive.Props>;
  excalidraw: Component<Blocks.Excalidraw.Props>;
  embed: Component<Blocks.Embed.Props>;
  equation: Component<Blocks.Equation.Props>;
  file: Component<Blocks.File.Props>;
  figma: Component<Blocks.Figma.Props>;
  gist: Component<Blocks.Gist.Props>;
  header: Component<Blocks.Header.Props>;
  image: Component<Blocks.Image.Props>;
  maps: Component<Blocks.Maps.Props>;
  numberedList: Component<Blocks.NumberedList.Props>;
  page: Component<Blocks.Page.Props>;
  pdf: Component<Blocks.Pdf.Props>;
  quote: Component<Blocks.Quote.Props>;
  subHeader: Component<Blocks.SubHeader.Props>;
  subSubHeader: Component<Blocks.SubSubHeader.Props>;
  tableOfContents: Component<Blocks.TableOfContents.Props>;
  text: Component<Blocks.Text.Props>;
  transclusionContainer: Component<Blocks.TransclusionContainer.Props>;
  transclusionReference: Component<Blocks.TransclusionReference.Props>;
  todo: Component<Blocks.Todo.Props>;
  toggle: Component<Blocks.Toggle.Props>;
  tweet: Component<Blocks.Tweet.Props>;
  typeform: Component<Blocks.Typeform.Props>;
  video: Component<Blocks.Video.Props>;
}
