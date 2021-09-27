import { Option, Some, None } from "excoptional";
import { Embeddable } from "../behaviour";
import { Blocks } from "@types";
import { Decorated } from "../";
import * as Mix from "../mixins";

export class FileBlock
  extends Mix.Titleable(Embeddable)<Blocks.File>
  implements Blocks.Template<Blocks.File>
{
  get size(): Option<Decorated> {
    const value = this._properties?.size;
    if (!value) return None();
    return Some(new Decorated(value));
  }
}
