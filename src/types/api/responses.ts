import type { Core, Blocks, Collections, CollectionViews } from "./";
import { User } from "./user";

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

export interface RecordMap {
  block: BlockMap;
  collection?: CollectionMap;
  collection_view?: ViewMap;
  notion_user?: UserMap;
}

export interface PageMap {
  [pageId: Core.ID]: ExtendedRecordMap | null;
}

interface NotionMap<T> {
  [key: string]: {
    role: Core.Role;
    value: T;
  };
}

export interface ExtendedRecordMap extends RecordMap {
  collection: CollectionMap;
  collection_view: ViewMap;
  notion_user: UserMap;
  // added for convenience
  collection_query: CollectionQuery;
  // added for convenience
  signed_urls: SignedUrlMap;
}

export type CollectionViewMap = {
  [collectionViewId: Collections.ViewID]: CollectionQueryResult;
};

export type CollectionQuery = {
  [collectionId: Collections.ID]: CollectionViewMap;
};

export type SignedUrlMap = {
  [blockId: Core.ID]: Core.URL;
};

export type CollectionMap = NotionMap<Collections.Collection>;
export type ViewMap = NotionMap<CollectionViews.AnyView>;
export type UserMap = NotionMap<User>;
export type BlockMap = NotionMap<Blocks.DTO>;

// NOTE: This is not a native Notion type, but rather a convenience type that
// extends Notion's native RecordMap with data for collection instances.

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

export type CollectionQueryResult =
  | BaseCollectionQueryResult
  | BoardCollectionQueryResult;

type QueryType = "results" | CollectionViews.ViewType;

interface BaseCollectionQueryResult {
  type: QueryType;
  total: number;
  blockIds: Blocks.ID[];
  aggregationResults: AggregationResult[];
}

type GroupResult = {
  value: AggregationResult;
  blockIds: Blocks.ID[];
  total: number;
  aggregationResult: AggregationResult;
};

interface BoardCollectionQueryResult extends BaseCollectionQueryResult {
  type: "board";
  groupResults: GroupResult[];
}

interface AggregationResult {
  type: Collections.Schema.PropertyType;
  value: number;
}
