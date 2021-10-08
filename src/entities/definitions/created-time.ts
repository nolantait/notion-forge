import { Property, Definition } from "@entities";
import { Domain, Api } from "@types";
import { format } from "date-fns";

export class CreatedTimeDefinition extends Definition<Api.Collections.Schema.CreatedTime> {
  readonly type = "created_time" as const;

  decorate(property: Property<Domain.Definitions.CreatedTime>): string {
    return format(new Date(property.data.asNumber), "MMM d, YYY hh:mm aa");
  }
}
