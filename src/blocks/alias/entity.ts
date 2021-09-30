import { Option, Some, None } from "excoptional";
import { Blocks } from "@types";
import { Block } from "@entities";

export class AliasBlock
  extends Block<Blocks.Alias>
  implements Blocks.Template<Blocks.Alias>
{
  get aliasPointer(): Option<Blocks.Format.AliasPointer> {
    const value = this._format?.alias_pointer;
    if (!value) return None();
    return Some(value);
  }
}
