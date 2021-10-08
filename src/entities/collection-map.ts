import { Some, None, Option } from "excoptional";
import { Api } from "@types";
import { Collection } from "@entities";

export class CollectionMap {
  private readonly dto: Api.Responses.CollectionMap;

  constructor(dto: Api.Responses.CollectionMap) {
    this.dto = dto;
  }

  find(id: Api.Collections.ID): Option<Collection> {
    const value = this.dto[id].value;
    if (!value) return None();
    return Some(new Collection(value));
  }
}
