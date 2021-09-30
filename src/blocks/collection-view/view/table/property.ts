import { Core, Collections } from "@types";

export class TableProperty {
  readonly dto: Collections.TableProperty;

  constructor(dto: Collections.TableProperty) {
    this.dto = dto;
  }

  get id(): Core.ID {
    return this.dto.property;
  }

  get width(): number {
    return this.dto.width;
  }
}
