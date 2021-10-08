import { Domain, Api } from "@types";

export class BoardGroup {
  readonly dto: Api.CollectionViews.BoardGroup;

  constructor(dto: Api.CollectionViews.BoardGroup) {
    this.dto = dto;
  }

  get value(): string {
    return this.dto.value.value ?? "";
  }

  get propertyId(): Domain.PropertyID {
    return this.dto.property;
  }

  get hidden(): boolean {
    return this.dto.hidden;
  }
}
