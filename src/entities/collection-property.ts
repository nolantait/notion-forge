import { Core, Collections, Formats } from "@types";
import { Some, None, Option } from "excoptional";

export class CollectionProperty {
  readonly id: Core.PropertyID;
  private readonly dto: Collections.PropertySchema;

  constructor(id: Core.PropertyID, dto: Collections.PropertySchema) {
    this.id = id;
    this.dto = dto;
  }

  get type(): Core.PropertyType {
    return this.dto.type;
  }

  get options(): Option<Collections.SelectOption[]> {
    const value = this.dto.options;
    if (!value) return None();
    return Some(value);
  }

  get numberFormat(): Option<Formats.NumberFormat> {
    const value = this.dto.number_format;
    if (!value) return None();
    return Some(value);
  }
}
