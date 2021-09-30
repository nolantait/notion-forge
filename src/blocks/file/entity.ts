import { Option, Some, None } from "excoptional";
import { Ability } from "@mixins";
import { Blocks } from "@types";
import { Decorated } from "@entities";

export class FileBlock
  extends Ability.Attachable<Blocks.File>
  implements Blocks.Template<Blocks.File>
{
  get size(): Option<Decorated> {
    const value = this._properties?.size;
    if (!value) return None();
    return Some(new Decorated(value));
  }
}
