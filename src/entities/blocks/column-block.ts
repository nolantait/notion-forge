import { Option, Some, None } from "excoptional";
import { Blocks } from "@types";
import { Block } from "../";

export class ColumnBlock
  extends Block<Blocks.Column>
  implements Blocks.Template<Blocks.Column>
{
  get columnRatio(): Option<number> {
    const value = this._format?.column_ratio;
    if (!value) return None();
    return Some(value);
  }
}
