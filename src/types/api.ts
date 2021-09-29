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

export interface RecordMap {
  block: Blocks.BlockMap;
  collection?: Collections.CollectionMap;
  collection_view?: Collections.ViewMap;
  notion_user?: UserMap;
}

export type UserMap = NotionMap<User>;
export type UserID = Core.ID;

export interface User {
  id: UserID;
  version: number;
  email: string;
  given_name: string;
  family_name: string;
  profile_photo: string;
  onboarding_completed: boolean;
  mobile_onboarding_completed: boolean;
}

export interface NotionMap<T> {
  [key: string]: {
    role: Core.Role;
    value: T;
  };
}

export interface PageMap {
  [pageId: Blocks.ID]: ExtendedRecordMap | null;
}

// NOTE: This is not a native Notion type, but rather a convenience type that
// extends Notion's native RecordMap with data for collection instances.

export type CollectionViewMap = {
  [collectionViewId: Collections.ViewID]: CollectionQueryResult;
};
export type CollectionQuery = {
  [collectionId: Collections.ID]: CollectionViewMap;
};
export type SignedUrlMap = {
  [blockId: Blocks.ID]: Core.URL;
};

export interface ExtendedRecordMap extends RecordMap {
  collection: Collections.CollectionMap;
  collection_view: Collections.ViewMap;
  notion_user: Core.UserMap;
  // added for convenience
  collection_query: CollectionQuery;
  // added for convenience
  signed_urls: SignedUrlMap;
}

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

export interface BaseCollectionQueryResult {
  type: Collections.ViewType;
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

export interface BoardCollectionQueryResult extends BaseCollectionQueryResult {
  type: "board";
  groupResults: GroupResult[];
}

export interface AggregationResult {
  type: Core.PropertyType;
  value: unknown;
}
