import { Property, Definition } from "@entities";
import { Domain, Api } from "@types";
import { format } from "date-fns";

export class DateDefinition extends Definition<Api.Collections.Schema.Date> {
  readonly type = "date" as const;

  decorate(property: Property<Domain.Definitions.Date>): string {
    return format(new Date(property.data.asNumber), "MMM d, YYY hh:mm aa");
  }
}
