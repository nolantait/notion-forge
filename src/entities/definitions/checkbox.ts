import { Definition, Decorated } from "@entities";
import { Api } from "@types";

export class CheckboxDefinition extends Definition<Api.Collections.Schema.Checkbox> {
  readonly type = "checkbox" as const;

  _format(decorated: Decorated): boolean {
    return decorated.asString === "Yes";
  }
}
