import { Some, None, Option } from "excoptional";
import { BlocksWithTrait } from "./";
import { Constructor } from "@mixins";
import { Formats } from "@types";

type Whitelist = BlocksWithTrait<"colorable">;

export function Colorable<TBase extends Constructor<Whitelist>>(Base: TBase) {
  return class extends Base {
    get blockColor(): Option<Formats.Color> {
      if (!this._format?.block_color) return None();
      return Some(this._format.block_color);
    }
  };
}
