import { Definition } from "@entities";
import { Api } from "@types";

export class EmailDefinition extends Definition<Api.Collections.Schema.Email> {
  readonly type = "email" as const;
}
