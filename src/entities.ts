import type { Formats, Blocks } from "@types";
import type { UnionToIntersection } from "type-fest";
import type { Factory } from "./types/entities";

type AnyProperty = Partial<UnionToIntersection<Blocks.Properties.Any>>;
type AnyFormat = Partial<UnionToIntersection<Blocks.Format.Any>>;

interface IBlock {
  readonly _properties: AnyProperty;
  readonly _format: AnyFormat;
}

type Mixable = new (...args: any[]) => IBlock;

function getProperty<T, K extends keyof T>(
  attributes: T,
  key: K,
  defval: NonNullable<T[K]>
): NonNullable<T[K]> {
  const entries = Object.entries(attributes);
  if (entries.length < 1) {
    return defval;
  }

  return attributes[key] ?? defval;
}

function Layoutable<TBase extends Mixable>(Base: TBase) {
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

function Glyphable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get pageIcon(): string {
      return getProperty(this._format, "page_icon", "");
    }
  };
}

function Colorable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get blockColor(): Formats.Color {
      return getProperty(this._format, "block_color", "transparent");
    }
  };
}

function Lockable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get blockLocked(): boolean {
      return getProperty(this._format, "block_locked", false);
    }

    get blockLockedBy(): string {
      return getProperty(this._format, "block_locked_by", "");
    }
  };
}

function Titleable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get title(): Formats.Decoration[] {
      return getProperty(this._properties, "title", [[""]]);
    }
  };
}

function Linkable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get link(): Formats.Decoration[] {
      return getProperty(this._properties, "link", [[""]]);
    }

    get description(): Formats.Decoration[] {
      return getProperty(this._properties, "description", [[""]]);
    }
  };
}

function Captionable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get caption(): Formats.Decoration[] {
      return getProperty(this._properties, "caption", [[""]]);
    }
  };
}

function Shapeable<TBase extends Mixable>(Base: TBase) {
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

function Sourceable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get source(): string[][] {
      return getProperty(this._properties, "source", [[""]]);
    }

    get displaySource(): string {
      return getProperty(this._format, "display_source", "");
    }
  };
}

export class Block implements IBlock {
  readonly _properties: AnyProperty;
  readonly _format: AnyFormat;

  constructor(block: Blocks.Any) {
    this._properties = (block.properties as Record<string, unknown>) ?? {};
    this._format = (block.format as Record<string, unknown>) ?? {};
  }
}

// Concrete Mixin Classes
const Typographic = Colorable(Titleable(Block));
const Markable = Linkable(Typographic);
const Iconable = Glyphable(Typographic);
const Pageable = Layoutable(Lockable(Iconable));
const Codeable = Captionable(Typographic);
const Embeddable = Sourceable(Shapeable(Captionable(Typographic)));

// Block Classes
export class PageBlock extends Pageable implements Factory<"page"> {}

export class CollectionViewPageBlock
  extends Pageable
  implements Factory<"collection_view_page"> {}

export class BookmarkBlock extends Markable implements Factory<"bookmark"> {
  get bookmarkIcon(): string {
    return getProperty(this._format, "bookmark_icon", "");
  }

  get bookmarkCover(): string {
    return getProperty(this._format, "bookmark_cover", "");
  }
}

export class TextBlock extends Typographic implements Factory<"text"> {}
export class BulletedListBlock
  extends Typographic
  implements Factory<"bulleted_list"> {}
export class NumberedListBlock
  extends Typographic
  implements Factory<"numbered_list"> {}
export class HeaderBlock extends Typographic implements Factory<"header"> {}
export class SubHeaderBlock
  extends Typographic
  implements Factory<"sub_header"> {}
export class SubSubHeaderBlock
  extends Typographic
  implements Factory<"sub_sub_header"> {}
export class QuoteBlock extends Typographic implements Factory<"quote"> {}
export class EquationBlock extends Typographic implements Factory<"equation"> {}
export class TodoBlock extends Typographic implements Factory<"to_do"> {
  get checked(): (["Yes"] | ["No"])[] {
    return getProperty(this._properties, "checked", [["No"]]);
  }
}
export class TableOfContentsBlock
  extends Typographic
  implements Factory<"table_of_contents"> {}
export class CalloutBlock extends Iconable implements Factory<"callout"> {}
export class ToggleBlock extends Typographic implements Factory<"toggle"> {}
export class CodeBlock extends Codeable implements Factory<"code"> {
  get language(): Formats.Decoration[] {
    return getProperty(this._properties, "language", [[""]]);
  }
}
export class CollectionViewBlock implements Factory<"collection_view"> {}
export class ImageBlock extends Embeddable implements Factory<"image"> {}
export class EmbedBlock extends Embeddable implements Factory<"embed"> {}
export class GistBlock extends Embeddable implements Factory<"gist"> {}
export class VideoBlock extends Embeddable implements Factory<"video"> {}
export class FigmaBlock extends Embeddable implements Factory<"figma"> {}
export class TypeformBlock extends Embeddable implements Factory<"typeform"> {}
export class CodepenBlock extends Embeddable implements Factory<"codepen"> {}
export class ExcalidrawBlock
  extends Embeddable
  implements Factory<"excalidraw"> {}
export class TweetBlock extends Embeddable implements Factory<"tweet"> {}
export class MapsBlock extends Embeddable implements Factory<"maps"> {}
export class PdfBlock extends Embeddable implements Factory<"pdf"> {}
export class AudioBlock extends Embeddable implements Factory<"audio"> {}
export class GoogleDriveBlock extends Embeddable implements Factory<"drive"> {
  get driveStatus(): Blocks.Format.DriveStatus {
    const defaultDriveStatus = { authed: false, last_fetched: Date.now() };
    return getProperty(this._format, "drive_status", defaultDriveStatus);
  }

  get driveProperties(): Blocks.Format.DriveProperties {
    const defaultDriveProperties = {
      url: "",
      icon: "",
      title: "",
      file_id: "",
      trashed: false,
      version: "",
      thumbnail: "",
      user_name: "",
      modified_time: Date.now(),
    };

    return getProperty(
      this._format,
      "drive_properties",
      defaultDriveProperties
    );
  }
}
export class FileBlock extends Embeddable implements Factory<"file"> {
  get size(): Formats.Decoration[] {
    return getProperty(this._properties, "size", [[""]]);
  }
}
export class AliasBlock extends Block implements Factory<"alias"> {
  get aliasPointer(): Blocks.Format.AliasPointer {
    const defaultAliasPointer = {
      id: "",
      table: "",
      spaceid: "",
    };

    return getProperty(this._format, "alias_pointer", defaultAliasPointer);
  }
}
export class TransclusionContainerBlock
  implements Factory<"transclusion_container"> {}
export class TransclusionReference
  extends Block
  implements Factory<"transclusion_reference">
{
  get copiedFromPointer(): Blocks.Format.Pointer {
    const defaultPointer = {
      id: "",
      spaceid: "",
    };

    return getProperty(this._format, "copied_from_pointer", defaultPointer);
  }

  get transclusionReferencePointer(): Blocks.Format.Pointer {
    const defaultPointer = {
      id: "",
      spaceid: "",
    };

    return getProperty(
      this._format,
      "transclusion_reference_pointer",
      defaultPointer
    );
  }
}

export class ColumnBlock extends Block implements Factory<"column"> {
  get columnRatio(): number {
    return getProperty(this._format, "column_ratio", 0);
  }
}
export class DividerBlock implements Factory<"divider"> {}
export class ColumnListBlock implements Factory<"column_list"> {}
