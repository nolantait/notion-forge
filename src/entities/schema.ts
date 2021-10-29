import { Some, None, Option } from "excoptional";
import { Api, Domain } from "@types";
import { DefinitionFactory } from "@factories";

export class Schema {
  readonly definitions: Domain.AnyDefinition[];
  private readonly dto: Api.Collections.CollectionSchema;

  constructor(dto: Api.Collections.CollectionSchema) {
    this.dto = dto;
    this.definitions = Object.keys(this.dto).map((key) =>
      DefinitionFactory(key, this.dto[key])
    );
  }

  find(id: Domain.PropertyID): Option<Domain.AnyDefinition> {
    const value = this.definitions.find((definition) => definition.id === id);
    if (!value) return None();
    return Some(value);
  }

  get all(): Domain.AnyDefinition[] {
    return this.definitions;
  }
}
