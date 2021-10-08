import { Definition, Property } from "@entities";
import { Domain, Api } from "@types";

export class CheckboxDefinition extends Definition<Api.Collections.Schema.Checkbox> {
  readonly type = "checkbox" as const;

  decorate(property: Property<Domain.Definitions.Checkbox>): boolean {
    return property.rawValue === "Yes";
  }
}
