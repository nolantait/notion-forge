import { Some, None, Option } from "excoptional";
import { BlocksWithTrait } from "./";

import { Constructor } from "@mixins";
import { Icon } from "@entities";

type Whitelist = BlocksWithTrait<"iconable">;

export function Iconable<TBase extends Constructor<Whitelist>>(Base: TBase) {
  return class extends Base {
    get pageIcon(): Option<Icon> {
      const path = this._format?.page_icon;
      if (!path) return None();
      return Some(new Icon(path));
    }
  };
}
