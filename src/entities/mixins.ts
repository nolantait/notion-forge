import { Some, None, Option } from "excoptional";
import { Blocks, Formats } from "@types";
import { Block, Decorated } from "./";

export type Constructor<T, A extends unknown[] = any[]> = new (...a: A) => T;

// type Test = Block<Blocks.Any>["type"];

type BlocksWithTrait<T extends keyof Traits> = Block<
  Blocks.WithTrait<Traits[T]>
>;

// type Test = Block<BlocksWithTrait<"titleable">>["type"];

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

type WithIcon = BlocksWithTrait<"glyphable">;
export function Glyphable<TBase extends Constructor<WithIcon>>(Base: TBase) {
  return class extends Base {
    get pageIcon(): Option<string> {
      if (!this._format?.page_icon) return None();
      return Some(this._format.page_icon);
    }
  };
}

type WithColor = BlocksWithTrait<"colorable">;
export function Colorable<TBase extends Constructor<WithColor>>(Base: TBase) {
  return class extends Base {
    get blockColor(): Option<Formats.Color> {
      if (!this._format?.block_color) return None();
      return Some(this._format.block_color);
    }
  };
}

type CanLock = BlocksWithTrait<"lockable">;
export function Lockable<TBase extends Constructor<CanLock>>(Base: TBase) {
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

type HasTitle = BlocksWithTrait<"titleable">;
export function Titleable<TBase extends Constructor<HasTitle>>(Base: TBase) {
  return class extends Base {
    get title(): Option<Decorated> {
      if (!this._properties?.title) return None();
      const value = this._properties.title;
      if (!value.length) return None();
      return Some(new Decorated(value));
    }
  };
}

type HasLink = BlocksWithTrait<"linkable">;
export function Linkable<TBase extends Constructor<HasLink>>(Base: TBase) {
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

type HasCaption = BlocksWithTrait<"captionable">;
export function Captionable<TBase extends Constructor<HasCaption>>(
  Base: TBase
) {
  return class extends Base {
    get caption(): Option<Decorated> {
      if (!this._properties?.caption) return None();
      const value = this._properties.caption;
      if (!value.length) return None();
      return Some(new Decorated(value));
    }
  };
}

type HasShape = BlocksWithTrait<"shapeable">;
export function Shapeable<TBase extends Constructor<HasShape>>(Base: TBase) {
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

type HasSource = BlocksWithTrait<"sourceable">;
export function Sourceable<TBase extends Constructor<HasSource>>(Base: TBase) {
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
