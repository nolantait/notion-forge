import { Property, Definition } from "@entities";
import { Domain, Api } from "@types";
import { format } from "date-fns";

export class LastEditedTimeDefinition extends Definition<Api.Collections.Schema.LastEditedTime> {
  readonly type = "last_edited_time" as const;

  decorate(property: Property<Domain.Definitions.LastEditedTime>): string {
    return format(new Date(property.data.asNumber), "MMM d, YYY hh:mm aa");
  }
}
