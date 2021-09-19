import type * as Blocks from "./blocks";
import type * as Formats from "./formats";
import type {
  Collection,
  CollectionView,
  CollectionQueryResult,
  CollectionPropertySchema,
  CollectionCardCover,
  CollectionCardCoverSize,
  CollectionCardCoverAspect,
} from "./";

import type { ImgProps } from "react-image";

export type Presenter<T> = (props: T) => React.ReactElement;

export interface IconProps {
  className?: string;
  alt?: string;
}

export interface AliasProps {
  block: Blocks.AliasBlock;
  level: number;
}

export type AliasPresenter = Presenter<AliasProps>;

export interface AssetWrapperProps {
  blockId: string;
  block: Blocks.AssetBlock;
}

export type AssetWrapperPresenter = Presenter<AssetWrapperProps>;

export type AssetProps = AssetWrapperProps;

export type AssetPresenter = Presenter<AssetProps>;

export interface AudioProps {
  block: Blocks.AudioBlock;
  className?: string;
}

export type AudioPresenter = Presenter<AudioProps>;

export interface BookmarkBlockProps {
  link: Formats.Decoration[];
  title: Formats.Decoration[];
  description: Formats.Decoration[];
  caption?: Formats.Decoration[];
}

export interface BookmarkBlock extends Blocks.BookmarkBlock {
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

export type Block = Blocks.Block | Blocks.AliasBlock;

export interface BlockProps {
  block: Block;
  level: number;

  footer?: React.ReactNode;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  pageCover?: React.ReactNode;

  hideBlockId?: boolean;
  children?: React.ReactNode;
}

export type BlockPresenter = Presenter<BlockProps>;

export interface BulletedListProps {
  block: Blocks.BulletedListBlock;
  blockId: string;
  children?: React.ReactNode;
}

export type BulletedListPresenter = Presenter<BulletedListProps>;

export interface CalloutProps {
  blockId: string;
  block: Blocks.CalloutBlock;
  children?: React.ReactNode;
}

export type CalloutPresenter = Presenter<CalloutProps>;

export interface CheckboxProps {
  isChecked: boolean;
  blockId: string;
}

export interface CardCoverOptions {
  cover: CollectionCardCover;
  coverSize?: CollectionCardCoverSize;
  coverAspect?: CollectionCardCoverAspect;
  coverPosition?: number;
}

export interface CardCoverProps extends CardCoverOptions {
  collection: Collection;
  block: Blocks.PageBlock;
}

export type CheckboxPresenter = Presenter<CheckboxProps>;

export interface CodeProps {
  code: string;
  language: string;
}

export type CodePresenter = Presenter<CodeProps>;

export type PropertyVisibility = {
  property: Blocks.PropertyID;
  visibility: "show" | "hide";
};

export type CollectionCardProperty = {
  property: Blocks.PropertyID;
  visible: boolean;
};

export interface CollectionCardProps
  extends Pick<CardCoverOptions, "cover" | "coverSize" | "coverAspect"> {
  collection: Collection;
  block: Blocks.PageBlock;
  properties?: CollectionCardProperty[];
  className?: string;
}

export type CollectionCardPresenter = Presenter<CollectionCardProps>;

export interface CollectionViewProps {
  collection: Collection;
  collectionView: CollectionView;
  collectionData: CollectionQueryResult;
}

export interface CollectionColumnTitleProps {
  schema: CollectionPropertySchema;
}

export type CollectionColumnTitlePresenter =
  Presenter<CollectionColumnTitleProps>;

export interface CollectionRowProps {
  block: Blocks.PageBlock;
  blockId: string;
}

export type CollectionRowPresenter = Presenter<CollectionRowProps>;

export interface CollectionProps {
  block: Blocks.CollectionViewBlock | Blocks.CollectionViewPageBlock;
  blockId: string;
  className?: string;
}

export type CollectionPresenter = Presenter<CollectionProps>;

export type CollectionViewPresenter = Presenter<CollectionViewProps>;

export interface ColumnListProps {
  blockId: string;
  children: React.ReactNode;
}

export type ColumnListPresenter = Presenter<ColumnListProps>;

export interface ColumnProps {
  block: Blocks.ColumnBlock;
  blockId: string;
  children?: React.ReactNode;
}

export type ColumnPresenter = Presenter<ColumnProps>;

export interface DividerProps {
  blockId: string;
}

export type DividerPresenter = Presenter<DividerProps>;

export interface DecoratedExternalPageProps
  extends Pick<DecoratedTextProps, "linkProps" | "block"> {
  decoration: Formats.ExternalLinkFormat;
}

export interface DecoratedPageLinkProps
  extends Pick<DecoratedTextProps, "linkProps"> {
  decoration: Formats.PageFormat;
}

export interface DecoratedUserProps
  extends Required<Pick<DecoratedTextProps, "block">> {
  decoration: Blocks.UserFormat;
}

export interface DecoratedLinkProps
  extends Pick<DecoratedTextProps, "linkProps" | "linkProtocol"> {
  decoration: Formats.LinkFormat;
  element: React.ReactElement;
}

export interface DecoratedTextProps
  extends Pick<TextProps, "block" | "linkProps" | "linkProtocol"> {
  decorations: Array<Formats.SubFormats.Decoration>;
  text: string;
  index: number;
}

export interface DecoratedElementProps
  extends Pick<DecoratedTextProps, "linkProps" | "linkProtocol" | "block"> {
  element: React.ReactElement;
  decoration: Blocks.SubFormats.Decoration;
}

export interface EquationProps {
  math: string;
  block?: boolean;
  children?: React.ReactNode;
  className?: string;
  settings?: Record<string, any>;
}

export type EquationPresenter = Presenter<EquationProps>;

export interface FileProps {
  block: Blocks.FileBlock;
  className?: string;
}

export type FilePresenter = Presenter<FileProps>;

export interface GoogleDriveProps {
  block: Blocks.GoogleDriveBlock;
  className?: string;
}

export type GoogleDrivePresenter = Presenter<GoogleDriveProps>;

export interface HeaderProps {
  block: Blocks.HeaderBlock | Blocks.SubHeaderBlock | Blocks.SubSubHeaderBlock;
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

export type LinkProps = React.HTMLProps<HTMLAnchorElement>;

export type LinkProtocol = "https" | "http" | "mailto" | "tel" | undefined;

export type LinkPresenter = Presenter<LinkProps>;

export interface NumberedListProps {
  block: Blocks.NumberedListBlock;
  blockId: string;
  children?: React.ReactNode;
}

export type NumberedListPresenter = Presenter<NumberedListProps>;

export type PageLinkProps = React.ComponentProps<"a">;
export type PageLinkPresenter = Presenter<PageLinkProps>;

export interface PageProps {
  block: Blocks.PageBlock | Blocks.CollectionViewPageBlock;
  blockId: string;
  children?: React.ReactNode;
  level: number;
  footer?: React.ReactNode;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  pageCover?: React.ReactNode;
}
export type PagePresenter = Presenter<PageProps>;

export type PageHeaderPresenter = Presenter<{}>;

export interface PageIconProps {
  block:
    | Blocks.PageBlock
    | Blocks.CalloutBlock
    | Blocks.CollectionViewBlock
    | Blocks.CollectionViewPageBlock;
  className?: string;
  hideDefaultIcon?: boolean;
  defaultIcon?: string | null;
}
export type PageIconPresenter = Presenter<PageIconProps>;

export interface PageTitleProps {
  block:
    | Blocks.PageBlock
    | Blocks.CollectionViewBlock
    | Blocks.CollectionViewPageBlock;
  className?: string;
}
export type PageTitlePresenter = Presenter<PageTitleProps>;

export interface PropertyProps {
  schema: Blocks.CollectionPropertySchema;
  block?: Blocks.PageBlock;
  collection: Blocks.Collection;
  data?: Blocks.Formats.Decoration[];
  inline?: boolean;
}

export type PropertyPresenter = Presenter<PropertyProps>;

export interface NumberPropertySchema
  extends Omit<Collections.PropertySchema, "number_format"> {
  number_format: Blocks.NumberFormat;
}

export interface BlocksRendererProps extends NotionContext {
  rootPageId?: string;
  footer?: React.ReactNode;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  pageCover?: React.ReactNode;
  blockId?: string;
  hideBlockId?: boolean;
}

export interface BlocksBlockRendererProps {
  footer?: React.ReactNode;

  blockId?: string;
  hideBlockId?: boolean;
  level?: number;
  zoom?: any;
}

export interface QuoteProps {
  blockId: string;
  block: Blocks.QuoteBlock;
}

export type QuotePresenter = Presenter<QuoteProps>;

export interface SyncContainerProps {
  block: Blocks.SyncBlock;
  blockId: string;
  children?: React.ReactNode;
}

export type SyncContainerPresenter = Presenter<SyncContainerProps>;

export interface SyncPointerProps {
  block: Blocks.SyncPointerBlock;
  level: number;
}

export type SyncPointerPresenter = Presenter<SyncPointerProps>;

export interface TableOfContentsProps {
  blockId: string;
  block: Blocks.TableOfContentsBlock;
}

export type TableOfContentsPresenter = Presenter<TableOfContentsProps>;

export interface TextProps {
  value: Formats.Decoration[];
  block?: Blocks.Block;
  linkProps?: LinkProps;
  linkProtocol?: LinkProtocol;
  inline?: boolean; // TODO: currently unused
}

export type TextPresenter = Presenter<TextProps>;

export interface TitleProps {
  value: Formats.Decoration[];
  block: Blocks.TextBlock | Blocks.PageBlock | Blocks.CollectionViewPageBlock;
}

export type TitlePresenter = Presenter<TitleProps>;

export interface TodoProps {
  block: Blocks.TodoBlock;
  blockId: Blocks.ID;
  children?: React.ReactNode;
}

export type TodoPresenter = Presenter<TodoProps>;

export interface ToggleProps {
  blockId: Blocks.ID;
  block: Blocks.ToggleBlock;
  children?: React.ReactNode;
}

export type TogglePresenter = Presenter<ToggleProps>;

export interface WrappedTextProps {
  block: Blocks.TextBlock;
  blockId: string;
  children: React.ReactNode;
}

export type WrappedTextPresenter = Presenter<WrappedTextProps>;

export interface Components {
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
  numberedList: NumberedListPresenter;
  page: PagePresenter;
  pageHeader: PageHeaderPresenter;
  pageIcon: PageIconPresenter;
  pageLink: PageLinkPresenter;
  pageTitle: PageTitlePresenter;
  property: PropertyPresenter;
  quote: QuotePresenter;
  syncContainer: SyncContainerPresenter;
  syncPointer: SyncPointerPresenter;
  tableOfContents: TableOfContentsPresenter;
  text: TextPresenter;
  title: TitlePresenter;
  todo: TodoPresenter;
  toggle: TogglePresenter;
  wrappedText: WrappedTextPresenter;
}
