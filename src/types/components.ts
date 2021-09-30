import * as Blocks from "@blocks";

export type Presenter<T> = (props: T) => React.ReactElement;

export interface Any {
  alias: Presenter<Blocks.Alias.Props>;
  audio: Presenter<Blocks.Audio.Props>;
  bookmark: Presenter<Blocks.Bookmark.Props>;
  bulletedList: Presenter<Blocks.BulletedList.Props>;
  callout: Presenter<Blocks.Callout.Props>;
  column: Presenter<Blocks.Column.Props>;
  columnList: Presenter<Blocks.ColumnList.Props>;
  code: Presenter<Blocks.Code.Props>;
  codepen: Presenter<Blocks.Codepen.Props>;
  collectionViewPage: Presenter<Blocks.CollectionViewPage.Props>;
  collectionView: Presenter<Blocks.CollectionView.Props>;
  divider: Presenter<Blocks.Divider.Props>;
  drive: Presenter<Blocks.Drive.Props>;
  excalidraw: Presenter<Blocks.Excalidraw.Props>;
  embed: Presenter<Blocks.Embed.Props>;
  equation: Presenter<Blocks.Equation.Props>;
  file: Presenter<Blocks.File.Props>;
  figma: Presenter<Blocks.Figma.Props>;
  gist: Presenter<Blocks.Gist.Props>;
  header: Presenter<Blocks.Header.Props>;
  image: Presenter<Blocks.Image.Props>;
  maps: Presenter<Blocks.Maps.Props>;
  numberedList: Presenter<Blocks.NumberedList.Props>;
  page: Presenter<Blocks.Page.Props>;
  pdf: Presenter<Blocks.Pdf.Props>;
  quote: Presenter<Blocks.Quote.Props>;
  subHeader: Presenter<Blocks.SubHeader.Props>;
  subSubHeader: Presenter<Blocks.SubSubHeader.Props>;
  tableOfContents: Presenter<Blocks.TableOfContents.Props>;
  text: Presenter<Blocks.Text.Props>;
  transclusionContainer: Presenter<Blocks.TransclusionContainer.Props>;
  transclusionReference: Presenter<Blocks.TransclusionReference.Props>;
  todo: Presenter<Blocks.Todo.Props>;
  toggle: Presenter<Blocks.Toggle.Props>;
  tweet: Presenter<Blocks.Tweet.Props>;
  typeform: Presenter<Blocks.Typeform.Props>;
  video: Presenter<Blocks.Video.Props>;
}
