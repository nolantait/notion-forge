import { Some, None, Option } from "excoptional";
import { BlocksWithTrait } from "./";
import { Constructor } from "@mixins";
import { Decorated } from "@entities";

type Whitelist = BlocksWithTrait<"sourceable">;

export function Sourceable<TBase extends Constructor<Whitelist>>(Base: TBase) {
  return class extends Base {
    get source(): Option<Decorated> {
      if (!this._properties?.source) return None();
      return Some(new Decorated(this._properties.source));
    }

    get displaySource(): Option<string> {
      const displaySource = this._format?.display_source;

      if (!displaySource) {
        const altSource = this.source.getOrElse(undefined);
        if (!altSource) return None();
        return Some(altSource.asString);
      }

      return Some(displaySource);
    }
  };
}
