import type { Core, Collections } from "../";
import type { Identity } from "./properties";

export type ViewQuery = {
  filter?: unknown;
  aggregate?: Aggregate;
  aggregations?: Aggregation[];
  group_by?: Core.PropertyID;
  sort?: Sort[];
};

type SortDirection = "ascending" | "descending";

type Sort = Identity & {
  direction: SortDirection;
};

type AggregationType = "count";

type AggregateID = Core.PropertyID;

type Aggregate = Identity & {
  type: AggregateID;
  aggregation_type: AggregationType;
  property: Core.PropertyID;
  view_type: Collections.ViewType;
};

type Aggregation = {
  property: Core.PropertyID;
  aggregator: AggregateID;
};
