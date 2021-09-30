import { Some, None, Option } from "excoptional";
import { API, Collections } from "@types";
import { CollectionQueryResult } from "@entities";

export class CollectionQueryMap {
  readonly dto: API.CollectionQuery;

  constructor(dto: API.CollectionQuery) {
    this.dto = dto;
  }

  find(
    collectionId: Collections.ID,
    viewId: Collections.ViewID
  ): Option<CollectionQueryResult> {
    const value = this.dto[collectionId]?.[viewId];
    if (!value) return None();
    return Some(new CollectionQueryResult(value));
  }
}
