import React, { useContext } from "react";
import { ExtendedRecordMap } from "notion-types";

import {
  MapPageUrl,
  MapImageUrl,
  SearchNotion,
  NotionComponents,
} from "./types";
import { defaultMapPageUrl, defaultMapImageUrl } from "./utils";

// All Supported Components
import { AssetWrapper as DefaultAssetWrapper } from "./components/asset-wrapper";
import { Asset as DefaultAsset } from "./components/asset";
import { Audio as DefaultAudio } from "./components/audio";
import { Bookmark as DefaultBookmark } from "./components/bookmark";
import { BulletedList as DefaultBulletedList } from "./components/bulleted-list";
import { Callout as DefaultCallout } from "./components/callout";
import { Checkbox as DefaultCheckbox } from "./components/checkbox";
import { Code as DefaultCode } from "./components/code";
import { CollectionCard as DefaultCollectionCard } from "./components/collection-card";
import { CollectionColumnTitle as DefaultCollectionColumnTitle } from "./components/collection-column-title";
import { CollectionRow as DefaultCollectionRow } from "./components/collection-row";
import { CollectionViewPage as DefaultCollectionViewPage } from "./components/collection-view-page";
import { CollectionViewBoard as DefaultCollectionViewBoard } from "./components/collection-view-board";
import { CollectionViewGallery as DefaultCollectionViewGallery } from "./components/collection-view-gallery";
import { CollectionViewList as DefaultCollectionViewList } from "./components/collection-view-list";
import { CollectionViewTable as DefaultCollectionViewTable } from "./components/collection-view-table";
import { CollectionView as DefaultCollectionView } from "./components/collection-view";
import { Collection as DefaultCollection } from "./components/collection";
import { ColumnList as DefaultColumnList } from "./components/column-list";
import { Column as DefaultColumn } from "./components/column";
import { Divider as DefaultDivider } from "./components/divider";
import { Equation as DefaultEquation } from "./components/equation";
import { File as DefaultFile } from "./components/file";
import { GoogleDrive as DefaultGoogleDrive } from "./components/google-drive";
import { Header as DefaultHeader } from "./components/header";
import { Link as DefaultLink } from "./components/link";
import { NumberedList as DefaultNumberedList } from "./components/numbered-list";
import { Page as DefaultPage } from "./components/page";
import { PageHeader as DefaultPageHeader } from "./components/page-header";
import { PageIcon as DefaultPageIcon } from "./components/page-icon";
import { PageLink as DefaultPageLink } from "./components/page-link";
import { PageTitle as DefaultPageTitle } from "./components/page-title";
import { Property as DefaultProperty } from "./components/property";
import { Quote as DefaultQuote } from "./components/quote";
import { SearchDialog as DefaultSearchDialog } from "./components/search-dialog";
import { SyncContainer as DefaultSyncContainer } from "./components/sync-container";
import { SyncPointerBlock as DefaultSyncPointerBlock } from "./components/sync-pointer-block";
import { TableOfContents as DefaultTableOfContents } from "./components/table-of-contents";
import { Text as DefaultText } from "./components/text";
import { Title as DefaultTitle } from "./components/title";
import { Todo as DefaultTodo } from "./components/to-do";
import { Toggle as DefaultToggle } from "./components/toggle";
import { WrappedText as DefaultWrappedText } from "./components/wrapped-text";

export const dummyLink = ({ href, rel, target, title, ...rest }) => (
  <span {...rest} />
);

const dummyComponent = (name: string) => () => {
  console.warn(
    `Error using empty component: ${name}\nYou should override this in NotionRenderer.components`
  );

  return null;
};

export interface NotionContext {
  recordMap: ExtendedRecordMap;
  components: NotionComponents;
  mapPageUrl: MapPageUrl;
  mapImageUrl: MapImageUrl;
  searchNotion?: SearchNotion;
  rootPageId?: string;
  fullPage: boolean;
  darkMode: boolean;
  previewImages: boolean;
  showCollectionViewDropdown: boolean;
  showTableOfContents: boolean;
  minTableOfContentsItems: number;
  defaultPageIcon?: string;
  defaultPageCover?: string;
  defaultPageCoverPosition?: number;
  zoom: any;
}

export interface PartialNotionContext {
  recordMap?: ExtendedRecordMap;
  components?: Partial<NotionComponents>;
  mapPageUrl?: MapPageUrl;
  mapImageUrl?: MapImageUrl;
  searchNotion?: SearchNotion;
  rootPageId?: string;
  fullPage?: boolean;
  darkMode?: boolean;
  previewImages?: boolean;
  showCollectionViewDropdown?: boolean;
  showTableOfContents?: boolean;
  minTableOfContentsItems?: number;
  defaultPageIcon?: string;
  defaultPageCover?: string;
  defaultPageCoverPosition?: number;
  zoom?: any;
}

const defaultComponents: NotionComponents = {
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
  link: DefaultLink,
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
  syncPointerBlock: DefaultSyncPointerBlock,
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
  recordMap: {
    block: {},
    collection: {},
    collection_view: {},
    collection_query: {},
    notion_user: {},
    signed_urls: {},
  },
  components: defaultComponents,
  mapPageUrl: defaultMapPageUrl(),
  mapImageUrl: defaultMapImageUrl,
  searchNotion: null,
  fullPage: false,
  darkMode: false,
  previewImages: false,
  showCollectionViewDropdown: true,
  showTableOfContents: false,
  minTableOfContentsItems: 3,
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,
  zoom: null,
};

const ctx = React.createContext<NotionContext>(defaultNotionContext);

export const NotionContextProvider: React.FC<PartialNotionContext> = ({
  components: themeComponents = {},
  children,
  mapPageUrl,
  mapImageUrl,
  rootPageId,
  ...rest
}) => {
  for (const key of Object.keys(rest)) {
    if (rest[key] === undefined) {
      delete rest[key];
    }
  }

  return (
    <ctx.Provider
      value={{
        ...defaultNotionContext,
        ...rest,
        rootPageId,
        mapPageUrl: mapPageUrl ?? defaultMapPageUrl(rootPageId),
        mapImageUrl: mapImageUrl ?? defaultMapImageUrl,
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
