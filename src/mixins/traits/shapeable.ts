import { Some, None, Option } from "excoptional";
import { BlocksWithTrait } from "./";
import { Constructor } from "@mixins";

type Whitelist = BlocksWithTrait<"shapeable">;

export function Shapeable<TBase extends Constructor<Whitelist>>(Base: TBase) {
  return class extends Base {
    get blockWidth(): Option<number> {
      if (!this._format?.block_width) return None();
      return Some(this._format.block_width);
    }

    get blockHeight(): Option<number> {
      if (!this._format?.block_height) return None();
      return Some(this._format.block_height);
    }

    get blockAspectRatio(): Option<number> {
      if (!this._format?.block_aspect_ratio) return None();
      return Some(this._format.block_aspect_ratio);
    }

    get blockPreserveScale(): Option<boolean> {
      if (!this._format?.block_preserve_scale) return None();
      return Some(this._format.block_preserve_scale);
    }

    get blockFullWidth(): Option<boolean> {
      if (!this._format?.block_full_width) return None();
      return Some(this._format.block_full_width);
    }

    get blockPageWidth(): Option<boolean> {
      if (!this._format?.block_page_width) return None();
      return Some(this._format.block_page_width);
    }
  };
}
