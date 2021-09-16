import React, { useContext } from "react";

import { NotionComponents, NotionContext } from "@types";
import { defaultMapPageUrl, defaultMapImageUrl } from "@utils";

// All Supported Components
import {
  Alias as DefaultAlias,
  AssetWrapper as DefaultAssetWrapper,
  Asset as DefaultAsset,
  Audio as DefaultAudio,
  Bookmark as DefaultBookmark,
  BulletedList as DefaultBulletedList,
  Callout as DefaultCallout,
  Checkbox as DefaultCheckbox,
  Code as DefaultCode,
  CollectionCard as DefaultCollectionCard,
  CollectionColumnTitle as DefaultCollectionColumnTitle,
  CollectionRow as DefaultCollectionRow,
  Page as DefaultCollectionViewPage,
  CollectionViewBoard as DefaultCollectionViewBoard,
  CollectionViewGallery as DefaultCollectionViewGallery,
  CollectionViewList as DefaultCollectionViewList,
  CollectionViewTable as DefaultCollectionViewTable,
  CollectionView as DefaultCollectionView,
  Collection as DefaultCollection,
  ColumnList as DefaultColumnList,
  Column as DefaultColumn,
  Divider as DefaultDivider,
  Equation as DefaultEquation,
  File as DefaultFile,
  GoogleDrive as DefaultGoogleDrive,
  Header as DefaultHeader,
  GracefulImage as DefaultImage,
  LazyImage as DefaultLazyImage,
  Link as DefaultLink,
  NumberedList as DefaultNumberedList,
  Page as DefaultPage,
  PageHeader as DefaultPageHeader,
  PageIcon as DefaultPageIcon,
  PageLink as DefaultPageLink,
  PageTitle as DefaultPageTitle,
  Property as DefaultProperty,
  Quote as DefaultQuote,
  SearchDialog as DefaultSearchDialog,
  SyncContainer as DefaultSyncContainer,
  SyncPointer as DefaultSyncPointer,
  TableOfContents as DefaultTableOfContents,
  Text as DefaultText,
  Title as DefaultTitle,
  Todo as DefaultTodo,
  Toggle as DefaultToggle,
  WrappedText as DefaultWrappedText,
} from "@components";

interface dummyLinkProps {
  href?: string;
  rel?: string;
  target?: string;
  title?: string;
}
export const dummyLink = (props: dummyLinkProps) => <span {...props} />;

const dummyComponent = (name: string) => () => {
  console.warn(
    `Error using empty component: ${name}\nYou should override this in NotionRenderer.components`
  );

  return null;
};

const defaultComponents: NotionComponents = {
  alias: DefaultAlias,
  assetWrapper: DefaultAssetWrapper,
  asset: DefaultAsset,
  audio: DefaultAudio,
  bookmark: DefaultBookmark,
  bulletedList: DefaultBulletedList,
  callout: DefaultCallout,
  checkbox: DefaultCheckbox,
  code: DefaultCode,
  collectionCard: DefaultCollectionCard,
  collectionColumnTitle: DefaultCollectionColumnTitle,
  collectionRow: DefaultCollectionRow,
  collectionViewPage: DefaultCollectionViewPage,
  collectionViewBoard: DefaultCollectionViewBoard,
  collectionViewGallery: DefaultCollectionViewGallery,
  collectionViewList: DefaultCollectionViewList,
  collectionViewTable: DefaultCollectionViewTable,
  collectionView: DefaultCollectionView,
  collection: DefaultCollection,
  columnList: DefaultColumnList,
  column: DefaultColumn,
  divider: DefaultDivider,
  equation: DefaultEquation,
  file: DefaultFile,
  googleDrive: DefaultGoogleDrive,
  header: DefaultHeader,
  image: DefaultImage,
  link: DefaultLink,
  lazyImage: DefaultLazyImage,
  numberedList: DefaultNumberedList,
  page: DefaultPage,
  pageHeader: DefaultPageHeader,
  pageIcon: DefaultPageIcon,
  pageLink: DefaultPageLink,
  pageTitle: DefaultPageTitle,
  property: DefaultProperty,
  quote: DefaultQuote,
  searchDialog: DefaultSearchDialog,
  syncContainer: DefaultSyncContainer,
  syncPointer: DefaultSyncPointer,
  tableOfContents: DefaultTableOfContents,
  text: DefaultText,
  title: DefaultTitle,
  todo: DefaultTodo,
  toggle: DefaultToggle,
  wrappedText: DefaultWrappedText,

  pdf: dummyComponent("pdf"),
  tweet: dummyComponent("tweet"),
  modal: dummyComponent("modal"),
};

const defaultNotionContext: NotionContext = {
  rootPageId: undefined,
  components: defaultComponents,
  mapPageUrl: defaultMapPageUrl(),
  mapImageUrl: defaultMapImageUrl,
  searchNotion: undefined,
  fullPage: false,
  previewImages: false,
  showCollectionViewDropdown: true,
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,
  zoom: null,
  recordMap: {
    block: {},
    collection: {},
    collection_view: {},
    collection_query: {},
    notion_user: {},
    signed_urls: {},
  },
};

const ctx = React.createContext<NotionContext>(defaultNotionContext);

export const NotionContextProvider: React.FC<NotionContext> = ({
  components: themeComponents = {},
  children,
  mapPageUrl,
  mapImageUrl,
  rootPageId,
  ...rest
}) => {
  const pageMapper = rootPageId ? defaultMapPageUrl(rootPageId) : mapPageUrl;

  return (
    <ctx.Provider
      value={{
        ...defaultNotionContext,
        ...rest,
        rootPageId,
        mapImageUrl,
        mapPageUrl: pageMapper,
        components: { ...defaultComponents, ...themeComponents },
      }}
    >
      {children}
    </ctx.Provider>
  );
};

export const NotionContextConsumer = ctx.Consumer;

export const useNotionContext = (): NotionContext => {
  return useContext(ctx);
};
