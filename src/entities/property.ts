import { Domain } from "@types";
import { Decorated } from "@entities";

export class Property<T extends Domain.AnyDefinition> {
  readonly definition: T;
  readonly data: Decorated;
  readonly type: string;

  constructor(definition: T, data: Decorated) {
    this.definition = definition;
    this.type = definition.type;
    this.data = data;
  }

  get value(): ReturnType<Domain.AnyDefinition["format"]> {
    return this.definition.format(this.data);
  }

  get rawValue(): string {
    return this.data.asString;
  }
}
