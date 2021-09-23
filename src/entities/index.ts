import { Some, None, Option } from "excoptional";

import type { Entities, Blocks } from "@types";
import * as Mixins from "./mixins";

import { Block } from "./block";
import { Decorated } from "./decorated";

export { Block, Decorated };

export const getProperty = <T, K extends keyof T>(
  attributes: T,
  key: K,
  defval: NonNullable<T[K]>
): NonNullable<T[K]> => {
  const rawValue = getRawProperty(attributes, key);
  const valueOrDefault = rawValue.getOrElse(defval);
  return valueOrDefault ?? defval;
};

const getRawProperty = <T, K extends keyof T>(
  attributes: T,
  key: K
): Option<T[K]> => {
  const value = attributes[key];

  return value ? Some(value) : None();
};

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

// Concrete Mixin Classes
const Typographic = Mixins.Colorable(Mixins.Titleable(Block));
const Markable = Mixins.Captionable(Mixins.Linkable(Typographic));
const Iconable = Mixins.Glyphable(Typographic);
const Pageable = Mixins.Layoutable(Mixins.Lockable(Iconable));
const Codeable = Mixins.Captionable(Typographic);
const Embeddable = Mixins.Sourceable(
  Mixins.Shapeable(Mixins.Captionable(Typographic))
);
const Collectable = Mixins.Glyphable(Embeddable);

// Block Classes
export class PageBlock extends Pageable implements Entities.Factory<"page"> {}

export class CollectionViewPageBlock
  extends Pageable
  implements Entities.Factory<"collection_view_page"> {}

export class BookmarkBlock
  extends Markable
  implements Entities.Factory<"bookmark">
{
  get bookmarkIcon(): string {
    return getProperty(this._format, "bookmark_icon", "");
  }

  get bookmarkCover(): string {
    return getProperty(this._format, "bookmark_cover", "");
  }
}

export class TextBlock
  extends Typographic
  implements Entities.Factory<"text"> {}

export class BulletedListBlock
  extends Typographic
  implements Entities.Factory<"bulleted_list"> {}

export class NumberedListBlock
  extends Typographic
  implements Entities.Factory<"numbered_list"> {}

export class HeaderBlock
  extends Typographic
  implements Entities.Factory<"header"> {}

export class SubHeaderBlock
  extends Typographic
  implements Entities.Factory<"sub_header"> {}

export class SubSubHeaderBlock
  extends Typographic
  implements Entities.Factory<"sub_sub_header"> {}

export class QuoteBlock
  extends Typographic
  implements Entities.Factory<"quote"> {}

export class EquationBlock
  extends Typographic
  implements Entities.Factory<"equation"> {}

export class TodoBlock
  extends Typographic
  implements Entities.Factory<"to_do">
{
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
  implements Entities.Factory<"table_of_contents"> {}

export class CalloutBlock
  extends Iconable
  implements Entities.Factory<"callout"> {}

export class ToggleBlock
  extends Typographic
  implements Entities.Factory<"toggle"> {}

export class CodeBlock extends Codeable implements Entities.Factory<"code"> {
  get code(): string {
    const value = getProperty(this._properties, "title", [[""]]);
    return new Decorated(value).asString;
  }

  get language(): Decorated {
    const value = getProperty(this._properties, "language", [["javascript"]]);
    return new Decorated(value);
  }
}

export class CollectionViewBlock
  extends Collectable
  implements Entities.Factory<"collection_view">
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

export class ImageBlock
  extends Embeddable
  implements Entities.Factory<"image"> {}

export class EmbedBlock
  extends Embeddable
  implements Entities.Factory<"embed"> {}

export class GistBlock extends Embeddable implements Entities.Factory<"gist"> {}

export class VideoBlock
  extends Embeddable
  implements Entities.Factory<"video"> {}

export class FigmaBlock
  extends Embeddable
  implements Entities.Factory<"figma"> {}

export class TypeformBlock
  extends Embeddable
  implements Entities.Factory<"typeform"> {}

export class CodepenBlock
  extends Embeddable
  implements Entities.Factory<"codepen"> {}

export class ExcalidrawBlock
  extends Embeddable
  implements Entities.Factory<"excalidraw"> {}

export class TweetBlock
  extends Embeddable
  implements Entities.Factory<"tweet"> {}

export class MapsBlock extends Embeddable implements Entities.Factory<"maps"> {}

export class PdfBlock extends Embeddable implements Entities.Factory<"pdf"> {}

export class AudioBlock
  extends Embeddable
  implements Entities.Factory<"audio"> {}

export class GoogleDriveBlock
  extends Embeddable
  implements Entities.Factory<"drive">
{
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

export class FileBlock extends Embeddable implements Entities.Factory<"file"> {
  get size(): Decorated {
    const value = getProperty(this._properties, "size", [[""]]);
    return new Decorated(value);
  }
}

export class AliasBlock extends Block implements Entities.Factory<"alias"> {
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
  implements Entities.Factory<"transclusion_container"> {}

export class TransclusionReferenceBlock
  extends Block
  implements Entities.Factory<"transclusion_reference">
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

export class ColumnBlock extends Block implements Entities.Factory<"column"> {
  get columnRatio(): number {
    return getProperty(this._format, "column_ratio", 0);
  }
}

export class DividerBlock implements Entities.Factory<"divider"> {}

export class ColumnListBlock implements Entities.Factory<"column_list"> {}
