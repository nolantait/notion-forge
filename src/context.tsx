import React, { useContext } from "react";

import { Components, Core } from "@types";
import { defaultMapPageUrl, defaultMapImageUrl } from "@utils";

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
  CollectionRow as DefaultCollectionRow,
  CollectionViewPage as DefaultCollectionViewPage,
  CollectionViewBoard as DefaultCollectionViewBoard,
  CollectionViewGallery as DefaultCollectionViewGallery,
  CollectionViewList as DefaultCollectionViewList,
  CollectionViewTable as DefaultCollectionViewTable,
  CollectionView as DefaultCollectionView,
  Divider as DefaultDivider,
  Equation as DefaultEquation,
  File as DefaultFile,
  GoogleDrive as DefaultGoogleDrive,
  Header as DefaultHeader,
  Image as DefaultImage,
  Link as DefaultLink,
  LazyImage as DefaultLazyImage,
  NumberedList as DefaultNumberedList,
  Page as DefaultPage,
  PageHeader as DefaultPageHeader,
  PageIcon as DefaultPageIcon,
  PageLink as DefaultPageLink,
  PageTitle as DefaultPageTitle,
  Property as DefaultProperty,
  Quote as DefaultQuote,
  SyncContainer as DefaultSyncContainer,
  SyncPointer as DefaultSyncPointer,
  TableOfContents as DefaultTableOfContents,
  Text as DefaultText,
  Title as DefaultTitle,
  Todo as DefaultTodo,
  Toggle as DefaultToggle,
} from "@components";

const defaultComponents: Components.Any = {
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
  collectionRow: DefaultCollectionRow,
  collectionViewPage: DefaultCollectionViewPage,
  collectionViewBoard: DefaultCollectionViewBoard,
  collectionViewGallery: DefaultCollectionViewGallery,
  collectionViewList: DefaultCollectionViewList,
  collectionViewTable: DefaultCollectionViewTable,
  collectionView: DefaultCollectionView,
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
  syncContainer: DefaultSyncContainer,
  syncPointer: DefaultSyncPointer,
  tableOfContents: DefaultTableOfContents,
  text: DefaultText,
  title: DefaultTitle,
  todo: DefaultTodo,
  toggle: DefaultToggle,
};

const defaultNotionContext: Core.NotionContext = {
  rootPageId: undefined,
  components: defaultComponents,
  mapPageUrl: defaultMapPageUrl(),
  mapImageUrl: defaultMapImageUrl,
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

const ctx = React.createContext<Core.NotionContext>(defaultNotionContext);

type ProviderProps = Core.NotionContext & {
  children: React.ReactElement;
};
export const ContextProvider: Components.Presenter<ProviderProps> = ({
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

export const useNotionContext = (): Core.NotionContext => {
  return useContext(ctx);
};
