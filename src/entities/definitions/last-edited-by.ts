import { Definition } from "@entities";
import { Api } from "@types";

export class LastEditedByDefinition extends Definition<Api.Collections.Schema.LastEditedBy> {
  readonly type = "last_edited_by" as const;
}
