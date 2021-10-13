import { Decorated, Definition } from "@entities";
import { Api } from "@types";

export class EmailDefinition extends Definition<Api.Collections.Schema.Email> {
  readonly type = "email" as const;

  _format(decorated: Decorated): string {
    return decorated.asString;
  }
}
