import { Option, Some, None } from "excoptional";
import { Definition, Decorated } from "@entities";
import { Api, Domain } from "@types";

export class SelectDefinition extends Definition<Api.Collections.Schema.Select> {
  readonly type = "select" as const;
  readonly options: Option<Domain.SelectOption[]>;

  constructor(id: Domain.PropertyID, dto: Api.Collections.Schema.Select) {
    super(id, dto);
    this.options = dto.options ? Some(dto.options) : None();
  }

  _format(decorated: Decorated): {
    options: Domain.SelectOption[];
    value: string[];
  } {
    return {
      value: decorated.asString.split(","),
      options: this.options.getOrElse([]),
    };
  }
}
