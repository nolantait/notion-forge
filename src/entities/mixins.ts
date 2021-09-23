import { Formats } from "@types";
import { getProperty, Block, Decorated } from "./";

type Mixin<T> = new (...args: any[]) => T;
type Mixable = Mixin<Block>;

export function Layoutable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get pageFullWidth(): boolean {
      return getProperty(this._format, "page_full_width", true);
    }

    get pageSmallText(): boolean {
      return getProperty(this._format, "page_small_text", false);
    }

    get pageCoverPosition(): number {
      return getProperty(this._format, "page_cover_position", 0.5);
    }

    get pageCover(): string {
      return getProperty(this._format, "page_cover", "");
    }
  };
}

export function Glyphable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get pageIcon(): string {
      return getProperty(this._format, "page_icon", "");
    }

    set pageIcon(icon: string) {
      this._format = { ...this._format, page_icon: icon };
    }
  };
}

export function Colorable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get blockColor(): Formats.Color {
      return getProperty(this._format, "block_color", "transparent");
    }
  };
}

export function Lockable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get blockLocked(): boolean {
      return getProperty(this._format, "block_locked", false);
    }

    get blockLockedBy(): string {
      return getProperty(this._format, "block_locked_by", "");
    }
  };
}

export function Titleable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get title(): Decorated {
      const value = getProperty(this._properties, "title", [[""]]);
      return new Decorated(value);
    }
  };
}

export function Linkable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get link(): Decorated {
      const value = getProperty(this._properties, "link", [[""]]);
      return new Decorated(value);
    }

    get description(): Decorated {
      const value = getProperty(this._properties, "description", [[""]]);
      return new Decorated(value);
    }
  };
}

export function Captionable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get caption(): Decorated {
      const value = getProperty(this._properties, "caption", [[""]]);
      return new Decorated(value);
    }
  };
}

export function Shapeable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get blockWidth(): number {
      return getProperty(this._format, "block_width", 0);
    }

    get blockHeight(): number {
      return getProperty(this._format, "block_height", 0);
    }

    get blockAspectRatio(): number {
      return getProperty(this._format, "block_aspect_ratio", 0);
    }

    get blockPreserveScale(): boolean {
      return getProperty(this._format, "block_preserve_scale", true);
    }

    get blockFullWidth(): boolean {
      return getProperty(this._format, "block_full_width", true);
    }

    get blockPageWidth(): boolean {
      return getProperty(this._format, "block_page_width", true);
    }
  };
}

export function Sourceable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get source(): Decorated {
      const value = getProperty(this._properties, "source", [[""]]);
      return new Decorated(value);
    }

    get displaySource(): string {
      const value = getProperty(this._format, "display_source", "");
      if (value.length) {
        return value;
      } else {
        return this.source.asString;
      }
    }
  };
}
