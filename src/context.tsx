import React, { useContext } from "react";

import { Domain, View } from "@types";
import { MapPageUrl, RecordMap } from "@entities";

import * as Blocks from "@blocks";

const DefaultComponents: View.Any = {
  alias: Blocks.Alias.Component,
  audio: Blocks.Audio.Component,
  bookmark: Blocks.Bookmark.Component,
  bulletedList: Blocks.BulletedList.Component,
  callout: Blocks.Callout.Component,
  column: Blocks.Column.Component,
  columnList: Blocks.ColumnList.Component,
  code: Blocks.Code.Component,
  codepen: Blocks.Codepen.Component,
  collectionViewPage: Blocks.CollectionViewPage.Component,
  collectionView: Blocks.CollectionView.Component,
  divider: Blocks.Divider.Component,
  drive: Blocks.Drive.Component,
  excalidraw: Blocks.Excalidraw.Component,
  embed: Blocks.Embed.Component,
  equation: Blocks.Equation.Component,
  file: Blocks.File.Component,
  figma: Blocks.Figma.Component,
  gist: Blocks.Gist.Component,
  header: Blocks.Header.Component,
  image: Blocks.Image.Component,
  maps: Blocks.Maps.Component,
  numberedList: Blocks.NumberedList.Component,
  page: Blocks.Page.Component,
  pdf: Blocks.Pdf.Component,
  quote: Blocks.Quote.Component,
  subHeader: Blocks.SubHeader.Component,
  subSubHeader: Blocks.SubSubHeader.Component,
  tableOfContents: Blocks.TableOfContents.Component,
  text: Blocks.Text.Component,
  transclusionContainer: Blocks.TransclusionContainer.Component,
  transclusionReference: Blocks.TransclusionReference.Component,
  todo: Blocks.Todo.Component,
  toggle: Blocks.Toggle.Component,
  typeform: Blocks.Typeform.Component,
  tweet: Blocks.Tweet.Component,
  video: Blocks.Video.Component,
};

const defaultNotionContext: Domain.NotionContext = {
  rootPageId: undefined,
  components: DefaultComponents,
  fullPage: false,
  previewImages: false,
  showCollectionViewDropdown: true,
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,
  zoom: null,
  recordMap: new RecordMap(),
};

const ctx = React.createContext<Domain.NotionContext>(defaultNotionContext);

type ProviderProps = Domain.NotionContext & {
  children: React.ReactElement;
};
export const ContextProvider: View.Component<ProviderProps> = ({
  components: themeComponents = {},
  children,
  rootPageId,
  ...rest
}) => {
  const RemapPageUrl: Domain.MapPageUrl = (page, rootId) =>
    MapPageUrl(page, rootId);
  const pageMapper = rootPageId ? RemapPageUrl : MapPageUrl;

  defaultNotionContext.recordMap.mapPageUrl = pageMapper;

  return (
    <ctx.Provider
      value={{
        ...defaultNotionContext,
        ...rest,
        rootPageId,
        components: { ...DefaultComponents, ...themeComponents },
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export const NotionContextConsumer = ctx.Consumer;

export const useNotionContext = (): Domain.NotionContext => {
  return useContext(ctx);
};
