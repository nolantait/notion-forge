import { Option, Some, None } from "excoptional";
import { Domain, Api } from "@types";
import { View } from "../entity";

export class TableView extends View<Api.CollectionViews.TableView> {
  readonly pageSort: Domain.Blocks.ID[];
  readonly tableWrap: Option<boolean>;

  constructor(dto: Api.CollectionViews.TableView) {
    super(dto);
    this.pageSort = this.dto.page_sort ?? [];
    this.tableWrap = this.format.then((format) => {
      const value = format?.table_wrap;
      if (!value) return None();
      return Some(value);
    });
  }
}
