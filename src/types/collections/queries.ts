import * as Properties from "./properties";
import { ViewType } from "../collections";
import { ID } from "../";

type SortDirection = "ascending" | "descending";

type Sort = Properties.Identity & {
  direction: SortDirection;
};

type AggregationType = "count";

type AggregateID = ID;

type Aggregate = Properties.Identity & {
  type: AggregateID;
  aggregation_type: AggregationType;
  property: Properties.ID;
  view_type: ViewType;
};

type Aggregation = {
  property: Properties.ID;
  aggregator: AggregateID;
};

export type ViewQuery = {
  filter?: unknown;
  aggregate?: Aggregate;
  aggregations?: Aggregation[];
  group_by?: Properties.ID;
  sort?: Sort[];
};
