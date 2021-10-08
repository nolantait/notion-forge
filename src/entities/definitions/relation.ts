import { Definition } from "@entities";
import { Api } from "@types";

export class RelationDefinition extends Definition<Api.Collections.Schema.Relation> {
  readonly type = "relation" as const;
}
