import { Api } from "@types";

export class SchemaDefinition {
  readonly id: string;
  readonly dto: Api.Collections.Schema.AnyDefinition;

  constructor(id: string, dto: Api.Collections.Schema.AnyDefinition) {
    this.id = id;
    this.dto = dto;
  }
}
