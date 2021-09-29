import { Some, None, Option } from "excoptional";
import { Core, Collections } from "@types";
import { CollectionProperty } from "@entities";

export class CollectionSchemaMap {
  private readonly dto: Collections.PropertySchemaMap;

  constructor(dto: Collections.PropertySchemaMap) {
    this.dto = dto;
  }

  find(id: Core.PropertyID): Option<CollectionProperty> {
    const value = this.dto[id];
    if (!value) return None();
    return Some(new CollectionProperty(id, value));
  }

  get all(): CollectionProperty[] {
    return Object.keys(this.dto).map(
      (propertyId) => new CollectionProperty(propertyId, this.dto[propertyId])
    );
  }
}
