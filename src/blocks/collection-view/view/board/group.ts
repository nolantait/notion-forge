import { Core, Collections } from "@types";

export class BoardGroup {
  readonly dto: Collections.BoardGroup;

  constructor(dto: Collections.BoardGroup) {
    this.dto = dto;
  }

  get value(): Collections.BoardGroupValue["value"] {
    return this.dto.value.value;
  }

  get propertyId(): Core.PropertyID {
    return this.dto.property;
  }

  get hidden(): boolean {
    return this.dto.hidden;
  }
}
