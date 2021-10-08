import { Some, None, Option } from "excoptional";
import { Api, Domain } from "@types";
import { SchemaDefinition } from "@entities";

export class Schema {
  readonly definitions: SchemaDefinition[];
  private readonly dto: Api.Collections.CollectionSchema;

  constructor(dto: Api.Collections.CollectionSchema) {
    this.dto = dto;
    this.definitions = Object.keys(this.dto).map(
      (key) => new SchemaDefinition(key, this.dto[key])
    );
  }

  find(id: Domain.PropertyID): Option<SchemaDefinition> {
    const value = this.definitions.find((definition) => definition.id === id);
    if (!value) return None();
    return Some(value);
  }

  get all(): SchemaDefinition[] {
    return this.definitions;
  }
}
