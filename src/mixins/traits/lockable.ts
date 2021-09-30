import { Some, None, Option } from "excoptional";
import { BlocksWithTrait } from "./";

import { Constructor } from "@mixins";

type Whitelist = BlocksWithTrait<"lockable">;

export function Lockable<TBase extends Constructor<Whitelist>>(Base: TBase) {
  return class extends Base {
    get blockLocked(): Option<boolean> {
      if (!this._format?.block_locked) return None();
      return Some(this._format.block_locked);
    }

    get blockLockedBy(): Option<string> {
      if (!this._format?.block_locked_by) return None();
      return Some(this._format.block_locked_by);
    }

    get _access() {
      const defaults = { block_locked: false, block_locked_by: "" };
      return Object.assign({}, defaults, this.format.getOrElse(defaults));
    }
  };
}
