import { Definition } from "@entities";
import { Api } from "@types";

export class PhoneNumberDefinition extends Definition<Api.Collections.Schema.PhoneNumber> {
  readonly type = "phone_number" as const;
}
