import { Domain, Api } from "@types";
import { Decorated } from "@entities";

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

  format(decorated: Decorated): ReturnType<Domain.AnyDefinition["_format"]> {
    return this._format(decorated);
  }

  abstract _format(
    decorated: Decorated
  ): ReturnType<Domain.AnyDefinition["_format"]>;
}
