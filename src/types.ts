import {
  CollectionQueryResult,
  CollectionCardCover,
  CollectionCardCoverAspect,
  CollectionCardCoverSize,
  PropertyID,
  PageBlock,
  VideoBlock,
  ImageBlock,
  EmbedBlock,
  FigmaBlock,
  TypeformBlock,
  ExcalidrawBlock,
  MapsBlock,
  TweetBlock,
  PdfBlock,
  GistBlock,
  CodepenBlock,
  GoogleDriveBlock,
  Collection as NotionCollection,
  CollectionView,
  ExtendedRecordMap,
  Block,
  SearchParams,
  SearchResults,
} from "notion-types";

export * as Notion from "notion-types";

export type AssetBlock =
  | VideoBlock
  | ImageBlock
  | EmbedBlock
  | FigmaBlock
  | TypeformBlock
  | ExcalidrawBlock
  | MapsBlock
  | TweetBlock
  | PdfBlock
  | GistBlock
  | CodepenBlock
  | GoogleDriveBlock;

export interface IconProps {
  className?: string;
  alt?: string;
}

export type MapPageUrl = (
  pageId: string,
  recordMap?: ExtendedRecordMap | undefined
) => string;
export type MapImageUrl = (url: string, block: Block) => string;
export type SearchNotion = (params: SearchParams) => Promise<SearchResults>;

export interface AliasBlock {
  type: "alias";
  format: {
    alias_pointer: {
      id: string;
      table: string;
      spaceId: string;
    };
  };
}

export interface AliasProps {
  block: AliasBlock;
  level: number;
}

export type AliasPresenter = (props: AliasProps) => JSX.Element;

export interface AssetWrapperProps {
  blockId: string;
  block: AssetBlock;
}

export type AssetWrapperPresenter = (props: AssetWrapperProps) => JSX.Element;

export interface AssetProps extends AssetWrapperProps {}

export interface BlockFormat {
  block_width: number;
  block_height: number;
  display_source: string;
  block_full_width: boolean;
  block_page_width: boolean;
  block_aspect_ratio: number;
  block_preserve_scale: boolean;
}

export interface NotionComponents {
  // TODO: better typing for arbitrary react components
  alias: AliasPresenter;
  assetWrapper: AssetWrapperPresenter;
  asset: any;
  audio: any;
  bookmark: any;
  bulletedList: any;
  callout: any;
  checkbox: any;
  code: any;
  collectionCard: any;
  collectionColumnTitle: any;
  collectionRow: any;
  collectionViewPage: any;
  collectionViewBoard: any;
  collectionViewGallery: any;
  collectionViewList: any;
  collectionViewTable: any;
  collectionView: any;
  collection: any;
  columnList: any;
  column: any;
  divider: any;
  equation: any;
  file: any;
  googleDrive: any;
  header: any;
  lazyImage: any;
  image: any;
  link: any;
  numberedList: any;
  page: any;
  pageHeader: any;
  pageIcon: any;
  pageLink: any;
  pageTitle: any;
  property: any;
  quote: any;
  searchDialog: any;
  syncContainer: any;
  syncPointerBlock: any;
  tableOfContents: any;
  text: any;
  title: any;
  todo: any;
  toggle: any;
  wrappedText: any;

  // assets
  pdf: any;
  tweet: any;
  modal: any;
}

export interface CollectionViewProps {
  collection: NotionCollection;
  collectionView: CollectionView;
  collectionData: CollectionQueryResult;
  padding: number;
  width: number;
}

export interface CollectionCardProps {
  collection: NotionCollection;
  block: PageBlock;
  cover: CollectionCardCover;
  coverSize: CollectionCardCoverSize;
  coverAspect: CollectionCardCoverAspect;
  properties?: Array<{
    property: PropertyID;
    visible: boolean;
  }>;
  className?: string;
}
