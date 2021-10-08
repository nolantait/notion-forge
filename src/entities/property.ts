import { AnyDefinition, Decorated } from "@entities";

export class Property {
  readonly schema: AnyDefinition;
  readonly data: Decorated;

  constructor(schema: AnyDefinition, data: Decorated) {
    this.schema = schema;
    this.data = data;
  }

  get value(): ReturnType<AnyDefinition["decorate"]> {
    return this.schema.decorate(this);
  }

  get rawValue(): string {
    return this.data.asString;
  }
}
