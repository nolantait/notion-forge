import { BlockMap, Collections, UserMap, ID, PropertyType } from "./";
// API types
// ----------------------------------------------------------------------------

export interface APIError {
  errorId: string;
  name: string;
  message: string;
}

// Aggregate API types
// ----------------------------------------------------------------------------

export interface RecordMap {
  block: BlockMap;
  collection?: Collections.CollectionMap;
  collection_view?: Collections.ViewMap;
  notion_user?: UserMap;
}

// NOTE: This is not a native Notion type, but rather a convenience type that
// extends Notion's native RecordMap with data for collection instances.

export interface ExtendedRecordMap extends RecordMap {
  collection: Collections.CollectionMap;
  collection_view: Collections.ViewMap;
  notion_user: UserMap;

  // added for convenience
  collection_query: {
    [collectionId: string]: {
      [collectionViewId: string]: CollectionQueryResult;
    };
  };

  // added for convenience
  signed_urls: {
    [blockId: string]: string;
  };
}

export interface PageChunk {
  recordMap: RecordMap;
  cursor: {
    stack: never;
  };
}

export interface CollectionInstance {
  recordMap: RecordMap;
  result: CollectionQueryResult;
}

export interface CollectionQueryResult {
  type: Collections.ViewType;
  total: number;
  blockIds: ID[];
  aggregationResults: Array<AggregationResult>;
}

export interface CollectionBoardQueryResult extends CollectionQueryResult {
  type: "board";
  groupResults?: Array<{
    value: AggregationResult;
    blockIds: ID[];
    total: number;
    aggregationResult: AggregationResult;
  }>;
}

export interface AggregationResult {
  type: PropertyType;
  value: any;
}
