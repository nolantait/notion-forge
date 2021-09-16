import * as Notion from "notion-types";
import { ImgProps } from "react-image";

export * as Notion from "notion-types";

export interface NotionContext {
  recordMap: Notion.ExtendedRecordMap;
  components: Components;
  mapPageUrl: MapPageUrl;
  mapImageUrl: MapImageUrl;
  rootPageId: string | undefined;
  fullPage: boolean;
  previewImages: boolean;
  showCollectionViewDropdown: boolean;
  defaultPageIcon: string | null;
  defaultPageCover: string | null;
  defaultPageCoverPosition: number;
  zoom: any;
  searchNotion?: SearchNotion;
}

export type AssetBlock =
  | Notion.VideoBlock
  | Notion.ImageBlock
  | Notion.EmbedBlock
  | Notion.FigmaBlock
  | Notion.TypeformBlock
  | Notion.ExcalidrawBlock
  | Notion.MapsBlock
  | Notion.TweetBlock
  | Notion.PdfBlock
  | Notion.GistBlock
  | Notion.CodepenBlock
  | Notion.GoogleDriveBlock;

export interface IconProps {
  className?: string;
  alt?: string;
}

export type MapPageUrl = (
  pageId: string,
  recordMap?: Notion.ExtendedRecordMap | undefined
) => string;
export type MapImageUrl = (url: string, block: Notion.Block) => string;
export type SearchNotion = (
  params: Notion.SearchParams
) => Promise<Notion.SearchResults>;

type Presenter<T> = (props: T) => JSX.Element;

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

export type AliasPresenter = Presenter<AliasProps>;

export interface AssetWrapperProps {
  blockId: string;
  block: AssetBlock;
}

export type AssetWrapperPresenter = Presenter<AssetWrapperProps>;

export interface AssetProps extends AssetWrapperProps {}

export type AssetPresenter = Presenter<AssetProps>;

export interface SyncPointerProps {
  block: Notion.SyncPointerBlock;
  level: number;
}

export interface AudioProps {
  block: Notion.AudioBlock;
  className?: string;
}

export type AudioPresenter = Presenter<AudioProps>;

export interface BookmarkBlockProps {
  link: Notion.Decoration[];
  title: Notion.Decoration[];
  description: Notion.Decoration[];
  caption?: Notion.Decoration[];
}

export interface BookmarkBlock extends Notion.BookmarkBlock {
  properties: BookmarkBlockProps;
}

export interface BookmarkProps {
  blockId: string;
  block: BookmarkBlock;
}

export type BookmarkPresenter = Presenter<BookmarkProps>;

export interface BlockFormat {
  block_width: number;
  block_height: number;
  display_source: string;
  block_full_width: boolean;
  block_page_width: boolean;
  block_aspect_ratio: number;
  block_preserve_scale: boolean;
}

export interface BulletedListProps {
  block: Notion.BulletedListBlock;
  blockId: string;
  children?: React.ReactNode;
}

export type BulletedListPresenter = Presenter<BulletedListProps>;

export interface CalloutProps {
  blockId: string;
  block: Notion.CalloutBlock;
  children?: React.ReactNode;
}

export type CalloutPresenter = Presenter<CalloutProps>;

export interface CheckboxProps {
  isChecked: boolean;
  blockId: string;
}

export interface CardCoverOptions {
  cover: Notion.CollectionCardCover;
  coverSize?: Notion.CollectionCardCoverSize;
  coverAspect?: Notion.CollectionCardCoverAspect;
  coverPosition?: number;
  coverUrl?: string;
}

export interface CardCoverProps extends CardCoverOptions {
  collection: Notion.Collection;
  block: Notion.PageBlock;
}

export type CheckboxPresenter = Presenter<CheckboxProps>;

export interface CodeProps {
  code: string;
  language: string;
}

export type CodePresenter = Presenter<CodeProps>;

export type PropertyVisibility = {
  property: Notion.PropertyID;
  visibility: "show" | "hide";
};

export interface CollectionCardProps
  extends Pick<CardCoverOptions, "cover" | "coverSize" | "coverAspect"> {
  collection: Notion.Collection;
  block: Notion.PageBlock;
  properties?: PropertyVisibility[];
  className?: string;
}

export type CollectionCardPresenter = Presenter<CollectionCardProps>;

export interface CollectionViewProps {
  collection: Notion.Collection;
  collectionView: Notion.CollectionView;
  collectionData: Notion.CollectionQueryResult;
}

export interface CollectionColumnTitleProps {
  schema: Notion.CollectionPropertySchema;
}

export type CollectionColumnTitlePresenter =
  Presenter<CollectionColumnTitleProps>;

export interface CollectionRowProps {
  block: Notion.PageBlock;
  blockId: string;
}

export type CollectionRowPresenter = Presenter<CollectionRowProps>;

export interface CollectionProps {
  block: Notion.CollectionViewBlock | Notion.CollectionViewPageBlock;
  className?: string;
}

export type CollectionPresenter = Presenter<CollectionProps>;

export interface PageProps {
  block: Notion.PageBlock | Notion.CollectionViewPageBlock;
  blockId: string;
  children: React.ReactNode;
  level: number;
  footer: React.ReactNode;
  pageHeader: React.ReactNode;
  pageFooter: React.ReactNode;
  pageAside: React.ReactNode;
  pageCover: React.ReactNode;
}

export type CollectionViewPresenter = Presenter<CollectionViewProps>;

export interface ColumnListProps {
  blockId: string;
  children: React.ReactNode;
}

export type ColumnListPresenter = Presenter<ColumnListProps>;

export interface ColumnProps {
  block: Notion.ColumnBlock;
  blockId: string;
  children?: React.ReactNode;
}

export type ColumnPresenter = Presenter<ColumnProps>;

export interface DividerProps {
  blockId: string;
}

export type DividerPresenter = Presenter<ColumnProps>;

export interface EquationProps {
  math: string;
  block?: boolean;
  children?: React.ReactNode;
  className?: string;
  settings?: Record<string, any>;
}

export type EquationPresenter = Presenter<EquationProps>;

export interface FileProps {
  block: Notion.FileBlock;
  className?: string;
}

export type FilePresenter = Presenter<FileProps>;

export interface GoogleDriveProps {
  block: Notion.GoogleDriveBlock;
  className?: string;
}

export type GoogleDrivePresenter = Presenter<GoogleDriveProps>;

export interface HeaderProps {
  block: Notion.HeaderBlock | Notion.SubHeaderBlock | Notion.SubSubHeaderBlock;
  blockId: string;
}

export type HeaderPresenter = Presenter<HeaderProps>;

export interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  height?: number;
  zoomable?: boolean;
}

export type LazyImagePresenter = Presenter<LazyImageProps>;

export type ImagePresenter = Presenter<ImgProps>;

export interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {}

export type LinkPresenter = Presenter<LinkProps>;

export type PagePresenter = Presenter<PageProps>;

export type SyncPointerPresenter = Presenter<SyncPointerProps>;

export interface Components {
  // TODO: better typing for arbitrary react components
  alias: AliasPresenter;
  assetWrapper: AssetWrapperPresenter;
  asset: AssetPresenter;
  audio: AudioPresenter;
  bookmark: BookmarkPresenter;
  bulletedList: BulletedListPresenter;
  callout: CalloutPresenter;
  checkbox: CheckboxPresenter;
  code: CodePresenter;
  collectionCard: CollectionCardPresenter;
  collectionColumnTitle: CollectionColumnTitlePresenter;
  collectionRow: CollectionRowPresenter;
  collectionViewPage: PagePresenter;
  collectionViewBoard: CollectionViewPresenter;
  collectionViewGallery: CollectionViewPresenter;
  collectionViewList: CollectionViewPresenter;
  collectionViewTable: CollectionViewPresenter;
  collectionView: CollectionViewPresenter;
  collection: CollectionPresenter;
  columnList: ColumnListPresenter;
  column: ColumnPresenter;
  divider: DividerPresenter;
  equation: EquationPresenter;
  file: FilePresenter;
  googleDrive: GoogleDrivePresenter;
  header: HeaderPresenter;
  lazyImage: LazyImagePresenter;
  image: ImagePresenter;
  link: LinkPresenter;
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
  syncPointer: SyncPointerPresenter;
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
