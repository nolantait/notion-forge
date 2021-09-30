import { Some, None, Option } from "excoptional";
import { BlocksWithTrait } from "./";
import { Constructor } from "@mixins";
import { Decorated } from "@entities";

type Whitelist = BlocksWithTrait<"titleable">;

export function Titleable<TBase extends Constructor<Whitelist>>(Base: TBase) {
  return class extends Base {
    get title(): Decorated {
      return new Decorated(this._properties.title);
    }
  };
}
