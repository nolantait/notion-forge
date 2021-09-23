import { Blocks, Formats } from "@types";
import { getProperty, Block, Decorated } from "./";

type Constructor<T = object, A extends any[] = any[]> = new (...a: A) => T;
type TypesWithTrait<T extends Record<string, any>> = Pick<
  Extract<Blocks.Any, T>,
  "type"
>;
type BlocksWithTrait<T extends Record<string, any>> = Block<
  TypesWithTrait<T>["type"]
>;

type WithLayout = BlocksWithTrait<{ format: Blocks.Format.Page }>;
export function Layoutable<TBase extends Constructor<WithLayout>>(Base: TBase) {
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

type WithIcon = BlocksWithTrait<{ format: Blocks.Format.Icon }>;
export function Glyphable<TBase extends Constructor<WithIcon>>(Base: TBase) {
  return class extends Base {
    get pageIcon(): string {
      return getProperty(this._format, "page_icon", "");
    }
  };
}

type WithColor = BlocksWithTrait<{ format: Blocks.Format.Color }>;
export function Colorable<TBase extends Constructor<WithColor>>(Base: TBase) {
  return class extends Base {
    get blockColor(): Formats.Color {
      return getProperty(this._format, "block_color", "transparent");
    }
  };
}

type CanLock = BlocksWithTrait<{ format: Blocks.Format.Access }>;
export function Lockable<TBase extends Constructor<CanLock>>(Base: TBase) {
  return class extends Base {
    get blockLocked(): boolean {
      return getProperty(this._format, "block_locked", false);
    }

    get blockLockedBy(): string {
      return getProperty(this._format, "block_locked_by", "");
    }
  };
}

type HasTitle = BlocksWithTrait<{ properties: Blocks.Properties.Title }>;
export function Titleable<TBase extends Constructor<HasTitle>>(Base: TBase) {
  return class extends Base {
    get title(): Decorated {
      const value = getProperty(this._properties, "title", [[""]]);
      return new Decorated(value);
    }
  };
}

type HasLink = BlocksWithTrait<{ properties: Blocks.Properties.Link }>;
export function Linkable<TBase extends Constructor<HasLink>>(Base: TBase) {
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

type HasCaption = BlocksWithTrait<{ properties: Blocks.Properties.Caption }>;
export function Captionable<TBase extends Constructor<HasCaption>>(
  Base: TBase
) {
  return class extends Base {
    get caption(): Decorated {
      const value = getProperty(this._properties, "caption", [[""]]);
      return new Decorated(value);
    }
  };
}

type HasShape = BlocksWithTrait<{ format: Blocks.Format.Block }>;
export function Shapeable<TBase extends Constructor<HasShape>>(Base: TBase) {
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

type HasSource = BlocksWithTrait<{
  properties: Blocks.Properties.Source;
  format: Blocks.Format.Source;
}>;
export function Sourceable<TBase extends Constructor<HasSource>>(Base: TBase) {
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
