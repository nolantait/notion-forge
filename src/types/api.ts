import type { Core, Blocks, Collections } from "./";

export type ErrorID = Core.ID;

// API types
// ----------------------------------------------------------------------------

export type APIError = {
  errorId: ErrorID;
  name: string;
  message: string;
};

// Aggregate API types
// ----------------------------------------------------------------------------

export type RecordMap = {
  block: Blocks.BlockMap;
  collection?: Collections.CollectionMap;
  collection_view?: Collections.ViewMap;
  notion_user?: Core.UserMap;
};

// NOTE: This is not a native Notion type, but rather a convenience type that
// extends Notion's native RecordMap with data for collection instances.

type CollectionQuery = {
  [collectionId: string]: {
    [collectionViewId: string]: CollectionQueryResult;
  };
};

type SignedUrlMap = {
  [blockId: Blocks.ID]: Core.URL;
};

export type ExtendedRecordMap = RecordMap & {
  collection: Collections.CollectionMap;
  collection_view: Collections.ViewMap;
  notion_user: Core.UserMap;
  // added for convenience
  collection_query: CollectionQuery;
  // added for convenience
  signed_urls: SignedUrlMap;
};

export type PageChunk = {
  recordMap: RecordMap;
  cursor: {
    stack: never;
  };
};

export type CollectionInstance = {
  recordMap: RecordMap;
  result: CollectionQueryResult;
};

export type CollectionQueryResult = {
  type: Collections.ViewType;
  total: number;
  blockIds: Blocks.ID[];
  aggregationResults: Array<AggregationResult>;
};

type GroupResult = {
  value: AggregationResult;
  blockIds: Blocks.ID[];
  total: number;
  aggregationResult: AggregationResult;
};

export type CollectionBoardQueryResult = CollectionQueryResult & {
  type: "board";
  groupResults: GroupResult[];
};

export interface AggregationResult {
  type: Core.PropertyType;
  value: unknown;
}
