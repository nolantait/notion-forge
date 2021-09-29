import { Core, Collections, Formats } from "@types";
import { Some, None, Option } from "excoptional";
import { CollectionProperty, PageProperty } from "@entities";

export class Property {
  readonly type: Core.PropertyType;
  private readonly _schema: CollectionProperty;
  private readonly _data: Decorated;

  constructor(schema: CollectionProperty, data: Decorated) {
    this.type = schema.type;
    this._schema = schema;
    this._data = data;
  }

  get value(): string {}
}
