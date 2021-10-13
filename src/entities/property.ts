import { AnyDefinition, Decorated } from "@entities";

export class Property<T extends AnyDefinition> {
  readonly definition: T;
  readonly data: Decorated;

  constructor(definition: T, data: Decorated) {
    this.definition = definition;
    this.data = data;
  }

  get value(): ReturnType<AnyDefinition["format"]> {
    return this.definition.format(this.data);
  }

  get rawValue(): string {
    return this.data.asString;
  }
}
