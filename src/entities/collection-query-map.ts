import { Some, None, Option } from "excoptional";
import { Api } from "@types";
import { CollectionQueryResult } from "@entities";

export class CollectionQueryMap {
  readonly dto: Api.Responses.CollectionQuery;

  constructor(dto: Api.Responses.CollectionQuery) {
    this.dto = dto;
  }

  find(
    collectionId: Api.Collections.ID,
    viewId: Api.Collections.ViewID
  ): Option<CollectionQueryResult> {
    const value = this.dto[collectionId]?.[viewId];
    if (!value) return None();
    return Some(new CollectionQueryResult(value));
  }
}
