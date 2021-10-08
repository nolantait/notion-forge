import { Option, Some, None } from "excoptional";
import { Definition, Property } from "@entities";
import { Api, Domain } from "@types";

export class SelectDefinition extends Definition<Api.Collections.Schema.Select> {
  readonly type = "select" as const;
  readonly options: Option<Domain.SelectOption[]>;

  constructor(id: Domain.PropertyID, dto: Api.Collections.Schema.Select) {
    super(id, dto);
    this.options = dto.options ? Some(dto.options) : None();
  }

  decorate(property: Property<Domain.Definitions.Select>): {
    options: Domain.SelectOption[];
    value: string[];
  } {
    return {
      value: property.rawValue.split(","),
      options: this.options.getOrElse([]),
    };
  }
}
