import React, { useContext } from "react";

import { Components, Core } from "@types";
import { MapPageUrl, RecordMap } from "@entities";

import {
  AliasComponent as DefaultAlias,
  AudioComponent as DefaultAudio,
  BookmarkComponent as DefaultBookmark,
  BulletedListComponent as DefaultBulletedList,
  CalloutComponent as DefaultCallout,
  ColumnComponent as DefaultColumn,
  ColumnListComponent as DefaultColumnList,
  CodeComponent as DefaultCode,
  CodepenComponent as DefaultCodepen,
  CollectionViewPageComponent as DefaultCollectionViewPage,
  CollectionViewComponent as DefaultCollectionView,
  DividerComponent as DefaultDivider,
  DriveComponent as DefaultDrive,
  ExcalidrawComponent as DefaultExcalidraw,
  EmbedComponent as DefaultEmbed,
  EquationComponent as DefaultEquation,
  FileComponent as DefaultFile,
  FigmaComponent as DefaultFigma,
  GistComponent as DefaultGist,
  HeaderComponent as DefaultHeader,
  ImageComponent as DefaultImage,
  MapsComponent as DefaultMaps,
  NumberedListComponent as DefaultNumberedList,
  PageComponent as DefaultPage,
  PdfComponent as DefaultPdf,
  QuoteComponent as DefaultQuote,
  SubHeaderComponent as DefaultSubHeader,
  SubSubHeaderComponent as DefaultSubSubHeader,
  TableOfContentsComponent as DefaultTableOfContents,
  TextComponent as DefaultText,
  TransclusionContainerComponent as DefaultTransclusionContainer,
  TransclusionReferenceComponent as DefaultTransclusionReference,
  TodoComponent as DefaultTodo,
  ToggleComponent as DefaultToggle,
  TypeformComponent as DefaultTypeform,
  TweetComponent as DefaultTweet,
  VideoComponent as DefaultVideo,
} from "@components";

const defaultComponents: Components.Any = {
  alias: DefaultAlias,
  audio: DefaultAudio,
  bookmark: DefaultBookmark,
  bulletedList: DefaultBulletedList,
  callout: DefaultCallout,
  column: DefaultColumn,
  columnList: DefaultColumnList,
  code: DefaultCode,
  codepen: DefaultCodepen,
  collectionViewPage: DefaultCollectionViewPage,
  collectionView: DefaultCollectionView,
  divider: DefaultDivider,
  drive: DefaultDrive,
  excalidraw: DefaultExcalidraw,
  embed: DefaultEmbed,
  equation: DefaultEquation,
  file: DefaultFile,
  figma: DefaultFigma,
  gist: DefaultGist,
  header: DefaultHeader,
  image: DefaultImage,
  maps: DefaultMaps,
  numberedList: DefaultNumberedList,
  page: DefaultPage,
  pdf: DefaultPdf,
  quote: DefaultQuote,
  subHeader: DefaultSubHeader,
  subSubHeader: DefaultSubSubHeader,
  tableOfContents: DefaultTableOfContents,
  text: DefaultText,
  transclusionContainer: DefaultTransclusionContainer,
  transclusionReference: DefaultTransclusionReference,
  todo: DefaultTodo,
  toggle: DefaultToggle,
  typeform: DefaultTypeform,
  tweet: DefaultTweet,
  video: DefaultVideo,
};

const defaultNotionContext: Core.NotionContext = {
  rootPageId: undefined,
  components: defaultComponents,
  fullPage: false,
  previewImages: false,
  showCollectionViewDropdown: true,
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,
  zoom: null,
  recordMap: new RecordMap(),
};

const ctx = React.createContext<Core.NotionContext>(defaultNotionContext);

type ProviderProps = Core.NotionContext & {
  children: React.ReactElement;
};
export const ContextProvider: Components.Presenter<ProviderProps> = ({
  components: themeComponents = {},
  children,
  rootPageId,
  ...rest
}) => {
  const RemapPageUrl: Core.MapPageUrl = (page, rootId) =>
    MapPageUrl(page, rootId);
  const pageMapper = rootPageId ? RemapPageUrl : MapPageUrl;

  defaultNotionContext.recordMap.mapPageUrl = pageMapper;

  return (
    <ctx.Provider
      value={{
        ...defaultNotionContext,
        ...rest,
        rootPageId,
        components: { ...defaultComponents, ...themeComponents },
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export const NotionContextConsumer = ctx.Consumer;

export const useNotionContext = (): Core.NotionContext => {
  return useContext(ctx);
};
