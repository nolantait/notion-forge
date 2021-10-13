import { Decorated, Definition } from "@entities";
import { Api } from "@types";
import { format } from "date-fns";

export class LastEditedTimeDefinition extends Definition<Api.Collections.Schema.LastEditedTime> {
  readonly type = "last_edited_time" as const;

  _format(decorated: Decorated): string {
    return format(new Date(decorated.asNumber), "MMM d, YYY hh:mm aa");
  }
}
