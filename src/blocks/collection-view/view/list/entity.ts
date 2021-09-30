import { Collections } from "@types";
import { ListProperty } from "./property";
import { View } from "../entity";

export class ListView extends View {
  readonly type: Collections.ViewType = "list";
  public dto: Collections.ListView;

  constructor(dto: Collections.ListView) {
    super(dto);
    this.dto = dto;
  }

  get properties(): ListProperty[] {
    return this.dto.format.list_properties.map(
      (prop) => new ListProperty(prop)
    );
  }
}
