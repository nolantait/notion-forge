import { Collections } from "@types";

export class CollectionPageProperty {
  private readonly dto: Collections.PageProperty;

  constructor(dto: Collections.PageProperty) {
    this.dto = dto;
  }

  get isVisible(): boolean {
    return this.dto.visible;
  }

  get isHidden(): boolean {
    return !this.isVisible;
  }
}
