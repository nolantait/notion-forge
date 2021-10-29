import { Decorated, Definition } from "@entities";
import { Api } from "@types";

export class CreatedByDefinition extends Definition<Api.Collections.Schema.CreatedBy> {
  readonly type = "created_by" as const;

  _format(decorated: Decorated): string {
    return decorated.asString;
  }
}