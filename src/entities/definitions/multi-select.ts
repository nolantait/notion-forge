import { Option, Some, None } from "excoptional";
import { Definition, Property } from "@entities";
import { Api, Domain } from "@types";

export class MultiSelectDefinition extends Definition<Api.Collections.Schema.MultiSelect> {
  readonly type = "multi_select" as const;
  readonly options: Option<Domain.SelectOption[]>;

  constructor(id: Domain.PropertyID, dto: Api.Collections.Schema.MultiSelect) {
    super(id, dto);
    this.options = dto.options ? Some(dto.options) : None();
  }

  decorate(property: Property<Domain.Definitions.MultiSelect>): string[] {
    return property.rawValue.split(",");
  }
}
