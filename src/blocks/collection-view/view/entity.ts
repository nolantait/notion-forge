import { Collections } from "@types";

export abstract class View {
  public dto: Collections.AnyView;

  constructor(dto: Collections.AnyView) {
    this.dto = dto;
  }

  get id(): Collections.ViewID {
    return this.dto.id;
  }
}
