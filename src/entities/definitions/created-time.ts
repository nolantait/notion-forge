import { Decorated, Definition } from "@entities";
import { Api } from "@types";
import { format } from "date-fns";

export class CreatedTimeDefinition extends Definition<Api.Collections.Schema.CreatedTime> {
  readonly type = "created_time" as const;

  _format(decorated: Decorated): string {
    return format(new Date(decorated.asNumber), "MMM d, YYY hh:mm aa");
  }
}
