import { Definition } from "@entities";
import { Api } from "@types";

export class TitleDefinition extends Definition<Api.Collections.Schema.Title> {
  readonly type = "title" as const;
}
