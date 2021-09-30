import { Some, None, Option } from "excoptional";
import { Constructor } from "@mixins";
import { BlocksWithTrait } from "./";
import { Decorated } from "@entities";

type Whitelist = BlocksWithTrait<"linkable">;
export function Linkable<TBase extends Constructor<Whitelist>>(Base: TBase) {
  return class extends Base {
    get link(): Option<Decorated> {
      if (!this._properties?.["link"]) return None();
      const value = this._properties["link"];
      if (!value.length) return None();
      return Some(new Decorated(value));
    }

    get description(): Option<Decorated> {
      if (!this._properties?.description) return None();
      const value = this._properties.description;
      if (!value.length) return None();
      return Some(new Decorated(value));
    }
  };
}
