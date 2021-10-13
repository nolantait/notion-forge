import { Decorated, Definition } from "@entities";
import { Api } from "@types";

export class TextDefinition extends Definition<Api.Collections.Schema.Text> {
  readonly type = "text" as const;

  _format(decorated: Decorated): string {
    return decorated.asString;
  }
}
