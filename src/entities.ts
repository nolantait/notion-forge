import type { Core, Formats, Blocks } from "@types";
import type { UnionToIntersection } from "type-fest";
import type { Factory } from "./types/entities";

type AnyProperty = Partial<UnionToIntersection<Blocks.Properties.Any>>;
type AnyFormat = Partial<UnionToIntersection<Blocks.Format.Any>>;

type Mixable = new (...args: any[]) => Block;

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

    set pageIcon(icon: string) {
      this._format = { ...this._format, page_icon: icon };
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
    get title(): Decorated {
      const value = getProperty(this._properties, "title", [[""]]);
      return new Decorated(value);
    }
  };
}

function Linkable<TBase extends Mixable>(Base: TBase) {
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

function Captionable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get caption(): Decorated {
      const value = getProperty(this._properties, "caption", [[""]]);
      return new Decorated(value);
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

function Traversable<TBase extends Mixable>(Base: TBase) {
  return class extends Base {
    get content(): Blocks.ID[] {
      return this._content;
    }
  };
}

export class Decorated {
  _value: Formats.Decoration[];

  constructor(value?: Formats.Decoration[] | string) {
    if (typeof value === "string") {
      this._value = [[value]];
    } else {
      this._value = value ?? [[""]];
    }
  }

  get isEmpty(): boolean {
    return this.asString.length === 0;
  }

  get asString(): string {
    return this._value[0][0];
  }

  get asDecoration(): Formats.Decoration[] {
    return this._value;
  }
}

export class Block {
  readonly _dto: Blocks.Any;

  constructor(block: Blocks.Any) {
    this._dto = block;
  }

  fetchProperty(key: string): unknown | undefined {
    if (Object.keys(this._properties).includes(key)) {
      return getProperty(this._properties, key as any, true);
    }

    return undefined;
  }

  get type(): Blocks.BlockType {
    return this._dto.type as Blocks.BlockType;
  }

  get id(): Blocks.ID {
    return this._dto.id as Blocks.ID;
  }

  get parentId(): Blocks.ID {
    const value = this._dto.parent_id;
    if (typeof value === "string") {
      return value;
    }

    throw new Error(`Missing parent ID for block ${this.id}`);
  }

  get parentTable(): Core.ParentType {
    const value = this._dto.parent_table;
    if (typeof value === "string") {
      const validParents = ["space", "block", "table", "collection"];
      if (validParents.includes(value)) {
        return value as Core.ParentType;
      }
      throw new Error(`Invalid parent type ${value}`);
    }

    throw new Error(`Parent value invalid for block ${this.id}`);
  }

  get content(): Blocks.ID[] {
    const value = this._dto.content ?? [];
    if (Array.isArray(value) && value.length && typeof value[0] === "string") {
      return value;
    }

    return [];
  }

  get _properties(): AnyProperty {
    const value = this._dto.properties;
    if (value && typeof value === "object") {
      return value;
    }

    throw new Error(`Missing properties for ${this.id}`);
  }

  get _format(): AnyFormat {
    const value = this._dto.format;
    if (value && typeof value === "object") {
      return value;
    }

    throw new Error(`Missing format for ${this.id}`);
  }

  set _format(value: AnyFormat) {
    this._format = { ...this._format, ...value };
  }
}

// Concrete Mixin Classes
const Typographic = Colorable(Titleable(Block));
const TraversableType = Traversable(Typographic);
const Listable = Traversable(Typographic);
const Markable = Captionable(Linkable(Typographic));
const Iconable = Glyphable(Typographic);
const Pageable = Layoutable(Lockable(Iconable));
const Codeable = Captionable(Typographic);
const Embeddable = Sourceable(Shapeable(Captionable(Typographic)));
const Collectable = Glyphable(Embeddable);

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

export class TextBlock extends TraversableType implements Factory<"text"> {}
export class BulletedListBlock
  extends Listable
  implements Factory<"bulleted_list"> {}
export class NumberedListBlock
  extends Listable
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
  get checked(): Decorated {
    const value = getProperty(this._properties, "checked", [["No"]]);
    return new Decorated(value);
  }

  get isChecked(): boolean {
    return this.checked.asString === "Yes";
  }
}
export class TableOfContentsBlock
  extends Typographic
  implements Factory<"table_of_contents"> {}
export class CalloutBlock extends Iconable implements Factory<"callout"> {}
export class ToggleBlock extends Typographic implements Factory<"toggle"> {}
export class CodeBlock extends Codeable implements Factory<"code"> {
  get code(): string {
    return this.title.asString;
  }

  get language(): Decorated {
    const value = getProperty(this._properties, "language", [["javascript"]]);
    return new Decorated(value);
  }
}
export class CollectionViewBlock
  extends Collectable
  implements Factory<"collection_view">
{
  readonly _viewIds: Blocks.ID[];
  readonly _collectionId: Blocks.ID;

  constructor(block: Blocks.CollectionView) {
    super(block);
    this._viewIds = block.view_ids;
    this._collectionId = block.collection_id;
  }

  get collectionId(): Blocks.ID {
    return this._collectionId;
  }

  get viewIds(): Blocks.ID[] {
    return this._viewIds;
  }
}

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
  get size(): Decorated {
    const value = getProperty(this._properties, "size", [[""]]);
    return new Decorated(value);
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
export class TransclusionReferenceBlock
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

export type AnyAsset =
  | ImageBlock
  | EmbedBlock
  | GistBlock
  | VideoBlock
  | FigmaBlock
  | TypeformBlock
  | CodepenBlock
  | ExcalidrawBlock
  | TweetBlock
  | MapsBlock
  | PdfBlock
  | AudioBlock
  | GoogleDriveBlock;
