import { Some, None, Option } from "excoptional";
import { BlocksWithTrait } from "./";
import { Constructor } from "@mixins";

type Whitelist = BlocksWithTrait<"pageable">;

export function Pageable<TBase extends Constructor<Whitelist>>(Base: TBase) {
  return class extends Base {
    get pageFullWidth(): Option<boolean> {
      if (!this._format?.page_full_width) return None();
      return Some(this._format.page_full_width);
    }

    get pageSmallText(): Option<boolean> {
      if (!this._format?.page_small_text) return None();
      return Some(this._format.page_small_text);
    }

    get pageCoverPosition(): Option<number> {
      if (!this._format?.page_cover_position) return None();
      return Some(this._format.page_cover_position);
    }

    get pageCover(): Option<string> {
      if (!this._format?.page_cover) return None();
      return Some(this._format.page_cover);
    }
  };
}
