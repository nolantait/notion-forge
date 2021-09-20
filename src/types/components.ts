import { Core, API, Collections, Formats, Blocks } from "./";

import type { ImgProps } from "react-image";

export type Presenter<T> = (props: T) => React.ReactElement;

// Mixins
type Stylable = {
  blockId?: string;
  className?: string;
};
type Nestable = {
  level: number;
};
type WithChildren = {
  children?: React.ReactNode;
};
type WithBlock<T> = { block: T };
type Decorated<F> = { decoration: F };
type WithLayout = {
  footer?: React.ReactNode;
  pageHeader?: React.ReactNode;
  pageFooter?: React.ReactNode;
  pageAside?: React.ReactNode;
  pageCover?: React.ReactNode;
};

// Props & Presenters
export type IconProps = Stylable & {
  alt?: string;
};

export type AliasProps = Nestable & WithBlock<Blocks.Alias>;
export type AliasPresenter = Presenter<AliasProps>;

export type AssetWrapperProps = Stylable & WithBlock<Blocks.AnyAsset>;
export type AssetWrapperPresenter = Presenter<AssetWrapperProps>;

export type AssetProps = AssetWrapperProps;
export type AssetPresenter = Presenter<AssetProps>;

export type AudioProps = Stylable & WithBlock<Blocks.Audio>;
export type AudioPresenter = Presenter<AudioProps>;

export type BookmarkBlockProps = Blocks.Properties.Link &
  Blocks.Properties.Title &
  Blocks.Properties.Caption;

export type BookmarkProps = Stylable & WithBlock<Blocks.Bookmark>;
export type BookmarkPresenter = Presenter<BookmarkProps>;

export type BlockProps = WithBlock<Blocks.Any> &
  Nestable &
  WithChildren & {
    hideBlockId?: boolean;
  };
export type BlockPresenter = Presenter<BlockProps>;

export type BulletedListProps = WithBlock<Blocks.BulletedList> &
  Stylable &
  WithChildren;
export type BulletedListPresenter = Presenter<BulletedListProps>;

export type CalloutProps = WithBlock<Blocks.Callout> & Stylable & WithChildren;
export type CalloutPresenter = Presenter<CalloutProps>;

export type CheckboxProps = Stylable & {
  isChecked: boolean;
};

export type CardCoverOptions = {
  cover: Collections.Card.Cover;
  coverSize?: Collections.Card.CoverSize;
  coverAspect?: Collections.Card.CoverAspect;
  coverPosition?: Collections.Card.CoverPosition;
};

export type CardCoverProps = WithBlock<Blocks.Page> &
  CardCoverOptions & {
    collection: Collections.Collection;
  };

export type CheckboxPresenter = Presenter<CheckboxProps>;

export type CodeProps = Blocks.Properties.Language & {
  code: string;
};
export type CodePresenter = Presenter<CodeProps>;

export type CollectionCardProps = Stylable &
  WithBlock<Blocks.Page> &
  Pick<CardCoverOptions, "cover" | "coverSize" | "coverAspect"> & {
    collection: Collections.Collection;
    properties?: Collections.Properties.Visible &
      Collections.Properties.Identity;
  };
export type CollectionCardPresenter = Presenter<CollectionCardProps>;

export interface CollectionViewProps {
  collection: Collections.Collection;
  collectionView: Collections.View;
  collectionData: API.CollectionQueryResult;
}

export type CollectionColumnTitleProps = {
  schema: Collections.PropertySchema;
};
export type CollectionColumnTitlePresenter =
  Presenter<CollectionColumnTitleProps>;

export type CollectionRowProps = WithBlock<Blocks.Page> & Stylable;
export type CollectionRowPresenter = Presenter<CollectionRowProps>;

export type CollectionProps = WithBlock<Blocks.CollectionView> &
  WithBlock<Blocks.CollectionViewPage> &
  Stylable;

export type CollectionPresenter = Presenter<CollectionProps>;
export type CollectionViewPresenter = Presenter<CollectionViewProps>;

export type ColumnListProps = Stylable & WithChildren;
export type ColumnListPresenter = Presenter<ColumnListProps>;

export type ColumnProps = WithBlock<Blocks.Column> & Stylable & WithChildren;
export type ColumnPresenter = Presenter<ColumnProps>;

export type DividerProps = Stylable;
export type DividerPresenter = Presenter<DividerProps>;

export type DecoratedExternalPageProps = Pick<
  DecoratedTextProps,
  "linkProps" | "block"
> &
  Decorated<Formats.ExternalLinkFormat>;

export type DecoratedPageLinkProps = Pick<DecoratedTextProps, "linkProps"> &
  Decorated<Formats.PageFormat>;

export type DecoratedUserProps = Required<Pick<DecoratedTextProps, "block">> &
  Decorated<Formats.UserFormat>;

export type DecoratedLinkProps = Pick<
  DecoratedTextProps,
  "linkProps" | "linkProtocol"
> &
  Decorated<Formats.LinkFormat> & {
    element: React.ReactElement;
  };

export type DecoratedTextProps = Pick<
  TextProps,
  "block" | "linkProps" | "linkProtocol"
> & {
  decorations: Formats.Decoration[];
  text: string;
  index: number;
};

export type DecoratedElementProps = Pick<
  DecoratedTextProps,
  "linkProps" | "linkProtocol" | "block"
> &
  Decorated<Formats.Decoration> & {
    element: React.ReactElement;
  };

export type EquationProps = WithChildren &
  Stylable & {
    math: string;
    block?: boolean;
    settings?: Record<string, unknown>;
  };
export type EquationPresenter = Presenter<EquationProps>;

export type FileProps = WithBlock<Blocks.File> & Stylable;
export type FilePresenter = Presenter<FileProps>;

export type GoogleDriveProps = WithBlock<Blocks.GoogleDrive> & Stylable;
export type GoogleDrivePresenter = Presenter<GoogleDriveProps>;

export type HeaderProps = WithBlock<Blocks.Header> &
  WithBlock<Blocks.SubHeader> &
  WithBlock<Blocks.SubSubHeader> &
  Stylable;
export type HeaderPresenter = Presenter<HeaderProps>;

export type LazyImageProps = Stylable & {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  height?: number;
  zoomable?: boolean;
};
export type LazyImagePresenter = Presenter<LazyImageProps>;
export type ImagePresenter = Presenter<ImgProps>;

export type LinkProps = React.HTMLProps<HTMLAnchorElement>;
export type LinkProtocol = "https" | "http" | "mailto" | "tel" | undefined;
export type LinkPresenter = Presenter<LinkProps>;

export type NumberedListProps = WithBlock<Blocks.NumberedList> &
  Stylable &
  WithChildren;
export type NumberedListPresenter = Presenter<NumberedListProps>;

export type PageLinkProps = React.ComponentProps<"a">;
export type PageLinkPresenter = Presenter<PageLinkProps>;

export type PageProps = WithBlock<Blocks.Page> &
  WithBlock<Blocks.CollectionViewPage> &
  WithChildren &
  Stylable &
  Nestable &
  WithLayout;
export type PagePresenter = Presenter<PageProps>;

export type PageHeaderPresenter = Presenter<unknown>;

export type PageIconProps = WithBlock<Blocks.Page> &
  WithBlock<
    Blocks.Callout | Blocks.CollectionView | Blocks.CollectionViewPage
  > &
  Stylable & {
    hideDefaultIcon?: boolean;
    defaultIcon?: string | null;
  };
export type PageIconPresenter = Presenter<PageIconProps>;

export type PageTitleProps = WithBlock<
  Blocks.Page | Blocks.CollectionView | Blocks.CollectionViewPage
> &
  Stylable;
export type PageTitlePresenter = Presenter<PageTitleProps>;

export type PropertyProps = Partial<WithBlock<Blocks.Page>> & {
  schema: Collections.PropertySchema;
  collection: Collections.Collection;
  data?: Formats.Decoration[];
  inline?: boolean;
};
export type PropertyPresenter = Presenter<PropertyProps>;

export type NumberPropertySchema = Omit<
  Collections.PropertySchema,
  "number_format"
> & {
  number_format: Formats.NumberFormat;
};

export type NotionRendererProps = Core.NotionContext &
  WithLayout &
  Stylable & {
    rootPageId?: string;
    hideBlockId?: boolean;
  };

export type QuoteProps = WithBlock<Blocks.Quote> & Stylable;
export type QuotePresenter = Presenter<QuoteProps>;

export type SyncContainerProps = WithBlock<Blocks.Sync> &
  Stylable &
  WithChildren;
export type SyncContainerPresenter = Presenter<SyncContainerProps>;

export type SyncPointerProps = WithBlock<Blocks.SyncPointer> & Nestable;
export type SyncPointerPresenter = Presenter<SyncPointerProps>;

export type TableOfContentsProps = WithBlock<Blocks.TableOfContents> & Stylable;
export type TableOfContentsPresenter = Presenter<TableOfContentsProps>;

export type TextProps = WithBlock<Blocks.AnyText> & {
  value: Formats.Decoration[];
  linkProps?: LinkProps;
  linkProtocol?: LinkProtocol;
  inline?: boolean; // TODO: currently unused
};

export type TextPresenter = Presenter<TextProps>;

export type TitleProps = WithBlock<
  Blocks.Text | Blocks.Page | Blocks.CollectionViewPage
> & {
  value: Formats.Decoration[];
};

export type TitlePresenter = Presenter<TitleProps>;

export type TodoProps = WithBlock<Blocks.Todo> & Stylable & WithChildren;
export type TodoPresenter = Presenter<TodoProps>;

export type ToggleProps = WithBlock<Blocks.Toggle> & Stylable & WithChildren;
export type TogglePresenter = Presenter<ToggleProps>;

export type WrappedTextProps = WithBlock<Blocks.Text> & Stylable & WithChildren;
export type WrappedTextPresenter = Presenter<WrappedTextProps>;

export interface Any {
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
