import { Option, Some, None } from "excoptional";
import { Domain, Api } from "@types";

export class ColumnBlock
  extends Domain.Block<Api.Blocks.Column>
  implements Domain.Blocks.Template<Api.Blocks.Column>
{
  columnRatio: Option<number>;

  constructor(block: Api.Blocks.Column) {
    super(block);
    this.columnRatio = this.format.then((format) => {
      const value = format?.column_ratio;
      if (!value) return None();
      return Some(value);
    });
  }
}
