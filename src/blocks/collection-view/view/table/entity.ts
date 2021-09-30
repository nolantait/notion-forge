import { Collections, Blocks } from "@types";
import { TableProperty } from "./property";
import { View } from "../entity";

export class TableView extends View {
  readonly type: Collections.ViewType = "table";
  public dto: Collections.TableView;

  constructor(dto: Collections.TableView) {
    super(dto);
    this.dto = dto;
  }

  get pageSort(): Blocks.ID[] {
    return this.dto.page_sort;
  }

  get tableWrap(): boolean {
    return this.dto.format.table_wrap;
  }

  get properties(): TableProperty[] {
    return this.dto.format.table_properties.map(
      (prop) => new TableProperty(prop)
    );
  }
}
