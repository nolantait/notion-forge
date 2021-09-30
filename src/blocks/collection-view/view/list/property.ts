import { Collections } from "@types";

export class ListProperty {
  readonly dto: Collections.ListProperty;

  constructor(dto: Collections.ListProperty) {
    this.dto = dto;
  }
}
