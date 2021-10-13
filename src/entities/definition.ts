import { Domain, Api } from "@types";
import { Decorated } from "@entities";
import * as Definitions from "./definitions";

export type AnyDefinition =
  | Definitions.Checkbox
  | Definitions.CreatedTime
  | Definitions.CreatedBy
  | Definitions.Date
  | Definitions.Email
  | Definitions.File
  | Definitions.Formula
  | Definitions.LastEditedTime
  | Definitions.LastEditedBy
  | Definitions.MultiSelect
  | Definitions.Select
  | Definitions.Number
  | Definitions.PhoneNumber
  | Definitions.Person
  | Definitions.Relation
  | Definitions.Title
  | Definitions.Text
  | Definitions.Url;

export abstract class Definition<
  T extends Api.Collections.Schema.AnyDefinition
> {
  readonly id: Domain.PropertyID;
  readonly name: string;
  protected readonly dto: T;
  abstract readonly type: T["type"];

  constructor(id: Domain.PropertyID, dto: T) {
    this.id = id;
    this.dto = dto;
    this.name = dto.name;
  }

  format(decorated: Decorated): ReturnType<AnyDefinition["_format"]> {
    return this._format(decorated);
  }

  abstract _format(decorated: Decorated): ReturnType<AnyDefinition["_format"]>;
}
