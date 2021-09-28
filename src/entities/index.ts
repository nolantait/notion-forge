export { Block } from "./block";
export { Decorated } from "./decorated";
export { RecordMap, MapPageUrl } from "./record-map";

export * from "./composite";
export * from "./collection";

export * from "./blocks/alias-block";
export * from "./blocks/audio-block";
export * from "./blocks/bookmark-block";
export * from "./blocks/bulleted-list-block";
export * from "./blocks/code-block";
export * from "./blocks/codepen-block";
export * from "./blocks/collection-view-block";
export * from "./blocks/collection-view-page-block";
export * from "./blocks/column-block";
export * from "./blocks/column-list-block";
export * from "./blocks/drive-block";
export * from "./blocks/divider-block";
export * from "./blocks/embed-block";
export * from "./blocks/equation-block";
export * from "./blocks/excalidraw-block";
export * from "./blocks/figma-block";
export * from "./blocks/file-block";
export * from "./blocks/gist-block";
export * from "./blocks/header-block";
export * from "./blocks/image-block";
export * from "./blocks/maps-block";
export * from "./blocks/numbered-list-block";
export * from "./blocks/page-block";
export * from "./blocks/pdf-block";
export * from "./blocks/quote-block";
export * from "./blocks/sub-header-block";
export * from "./blocks/sub-sub-header-block";
export * from "./blocks/table-of-contents-block";
export * from "./blocks/text-block";
export * from "./blocks/todo-block";
export * from "./blocks/toggle-block";
export * from "./blocks/transclusion-container-block";
export * from "./blocks/transclusion-reference-block";
export * from "./blocks/tweet-block";
export * from "./blocks/typeform-block";
export * from "./blocks/video-block";

// export type AnyBlock = Block<Blocks.Any>;
// export type EveryBlock =
//   | AliasBlock
//   | AudioBlock
//   | BookmarkBlock
//   | BulletedListBlock
//   | CalloutBlock
//   | ColumnBlock
//   | ColumnListBlock
//   | CodeBlock
//   | CodepenBlock
//   | CollectionViewPageBlock
//   | CollectionViewBlock
//   | DividerBlock
//   | DriveBlock
//   | ExcalidrawBlock
//   | EmbedBlock
//   | EquationBlock
//   | FileBlock
//   | FigmaBlock
//   | GistBlock
//   | HeaderBlock
//   | ImageBlock
//   | MapsBlock
//   | NumberedListBlock
//   | PageBlock
//   | PdfBlock
//   | QuoteBlock
//   | SubHeaderBlock
//   | SubSubHeaderBlock
//   | TableOfContentsBlock
//   | TextBlock
//   | TransclusionContainerBlock
//   | TransclusionReferenceBlock
//   | TodoBlock
//   | ToggleBlock
//   | TypeformBlock
//   | TweetBlock
//   | VideoBlock;
//
// export type AnyAsset =
//   | ImageBlock
//   | EmbedBlock
//   | GistBlock
//   | VideoBlock
//   | FigmaBlock
//   | TypeformBlock
//   | CodepenBlock
//   | ExcalidrawBlock
//   | TweetBlock
//   | MapsBlock
//   | PdfBlock
//   | AudioBlock
//   | DriveBlock;
