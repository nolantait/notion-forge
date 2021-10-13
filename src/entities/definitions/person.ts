import { Decorated, Definition } from "@entities";
import { Api } from "@types";

export class PersonDefinition extends Definition<Api.Collections.Schema.Person> {
  readonly type = "person" as const;

  _format(decorated: Decorated): string {
    return decorated.asString;
  }
}
