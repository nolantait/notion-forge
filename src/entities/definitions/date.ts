import { Decorated, Definition } from "@entities";
import { Api } from "@types";
import { format } from "date-fns";

export class DateDefinition extends Definition<Api.Collections.Schema.Date> {
  readonly type = "date" as const;

  _format(decorated: Decorated): string {
    return format(new Date(decorated.asNumber), "MMM d, YYY hh:mm aa");
  }
}
