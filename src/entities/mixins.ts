import { Blocks, Formats } from "@types";
import { getProperty, Block, Decorated } from "./";

export type Constructor<T = object, A extends any[] = any[]> = new (
  ...a: A
) => T;

type BlocksWithTrait<T extends keyof Traits> = Block<
  Blocks.WithTrait<Traits[T]>
>;

// type Test = BlocksWithTrait<Traits["layoutable"]>;

type Traits = {
  layoutable: { format: Blocks.Format.Page };
  glyphable: { format: Blocks.Format.Icon };
  colorable: { format: Blocks.Format.Color };
  lockable: { format: Blocks.Format.Access };
  shapeable: { format: Blocks.Format.Block };
  titleable: { properties: Blocks.Properties.Title };
  linkable: { properties: Blocks.Properties.Link };
  captionable: { properties: Blocks.Properties.Caption };
  sourceable:
    | {
        format: Blocks.Format.Source;
      }
    | {
        properties: Blocks.Format.Source;
      };
};

type WithLayout = BlocksWithTrait<"layoutable">;
export function Layoutable<TBase extends Constructor<WithLayout>>(Base: TBase) {
  return class extends Base {
    get pageFullWidth(): boolean {
      return getProperty(this.format, "page_full_width", true);
    }

    get pageSmallText(): boolean {
      return getProperty(this.format, "page_small_text", false);
    }

    get pageCoverPosition(): number {
      return getProperty(this.format, "page_cover_position", 0.5);
    }

    get pageCover(): string {
      return getProperty(this.format, "page_cover", "");
    }
  };
}

type WithIcon = BlocksWithTrait<"glyphable">;
export function Glyphable<TBase extends Constructor<WithIcon>>(Base: TBase) {
  return class extends Base {
    get pageIcon(): string {
      return getProperty(this.format, "page_icon", "");
    }
  };
}

type WithColor = BlocksWithTrait<"colorable">;
export function Colorable<TBase extends Constructor<WithColor>>(Base: TBase) {
  return class extends Base {
    get blockColor(): Formats.Color {
      return getProperty(this.format, "block_color", "transparent");
    }
  };
}

type CanLock = BlocksWithTrait<"lockable">;
export function Lockable<TBase extends Constructor<CanLock>>(Base: TBase) {
  return class extends Base {
    get blockLocked(): boolean {
      return getProperty(this.format, "block_locked", false);
    }

    get blockLockedBy(): string {
      return getProperty(this.format, "block_locked_by", "");
    }
  };
}

type HasTitle = BlocksWithTrait<"titleable">;
export function Titleable<TBase extends Constructor<HasTitle>>(Base: TBase) {
  return class extends Base {
    get title(): Decorated {
      const value = getProperty(this.properties, "title", [[""]]);
      return new Decorated(value);
    }
  };
}

type HasLink = BlocksWithTrait<"linkable">;
export function Linkable<TBase extends Constructor<HasLink>>(Base: TBase) {
  return class extends Base {
    get link(): Decorated {
      const value = getProperty(this.properties, "link", [[""]]);
      return new Decorated(value);
    }

    get description(): Decorated {
      const value = getProperty(this.properties, "description", [[""]]);
      return new Decorated(value);
    }
  };
}

type HasCaption = BlocksWithTrait<"captionable">;
export function Captionable<TBase extends Constructor<HasCaption>>(
  Base: TBase
) {
  return class extends Base {
    get caption(): Decorated {
      const value = getProperty(this.properties, "caption", [[""]]);
      return new Decorated(value);
    }
  };
}

type HasShape = BlocksWithTrait<"shapeable">;
export function Shapeable<TBase extends Constructor<HasShape>>(Base: TBase) {
  return class extends Base {
    get blockWidth(): number {
      return getProperty(this.format, "block_width", 0);
    }

    get blockHeight(): number {
      return getProperty(this.format, "block_height", 0);
    }

    get blockAspectRatio(): number {
      return getProperty(this.format, "block_aspect_ratio", 0);
    }

    get blockPreserveScale(): boolean {
      return getProperty(this.format, "block_preserve_scale", true);
    }

    get blockFullWidth(): boolean {
      return getProperty(this.format, "block_full_width", true);
    }

    get blockPageWidth(): boolean {
      return getProperty(this.format, "block_page_width", true);
    }
  };
}

type HasSource = BlocksWithTrait<"sourceable">;
export function Sourceable<TBase extends Constructor<HasSource>>(Base: TBase) {
  return class extends Base {
    get source(): Decorated {
      const value = getProperty(this.properties, "source", [[""]]);
      return new Decorated(value);
    }

    get displaySource(): string {
      const value = getProperty(this.format, "display_source", "");
      if (value.length) {
        return value;
      } else {
        return this.source.asString;
      }
    }
  };
}
