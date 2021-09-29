import { Some, None, Option } from "excoptional";
import { Collections } from "@types";
import { Collection } from "@entities";

export class CollectionMap {
  private readonly dto: Collections.CollectionMap;

  constructor(dto: Collections.CollectionMap) {
    this.dto = dto;
  }

  find(id: Collections.ID): Option<Collection> {
    const value = this.dto[id].value;
    if (!value) return None();
    return Some(new Collection(value));
  }
}
