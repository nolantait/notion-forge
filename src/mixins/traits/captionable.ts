import { Some, None, Option } from "excoptional";
import { Constructor } from "@mixins";
import { BlocksWithTrait } from "./";
import { Decorated } from "@entities";

type Whitelist = BlocksWithTrait<"captionable">;

export function Captionable<TBase extends Constructor<Whitelist>>(
  Base: TBase
): Constructor<Whitelist> {
  return class Captionable extends Base {
    get caption(): Option<Decorated> {
      if (!this.properties.caption) return None();
      const value = this._properties.caption;
      if (!value.length) return None();
      return Some(new Decorated(value));
    }
  };
}
