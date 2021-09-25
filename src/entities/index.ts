import { Some, None, Option } from "excoptional";

import type { Blocks } from "@types";
import * as Mixins from "./mixins";

import { Block } from "./block";
import { Decorated } from "./decorated";

export { Mixins, Block, Decorated };

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

export type AnyBlock =
  | AliasBlock
  | TransclusionContainerBlock
  | TransclusionReferenceBlock
  | PageBlock
  | CollectionViewPageBlock
  | BookmarkBlock
  | TextBlock
  | BulletedListBlock
  | NumberedListBlock
  | HeaderBlock
  | SubHeaderBlock
  | SubSubHeaderBlock
  | QuoteBlock
  | EquationBlock
  | TodoBlock
  | TableOfContentsBlock
  | CalloutBlock
  | ToggleBlock
  | CodeBlock
  | CollectionViewBlock
  | AnyAsset;

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

// Mixins
const Typographic = Mixins.Colorable(Mixins.Titleable(Block));
const Linkable = Mixins.Linkable(Typographic);
const Pageable = Mixins.Lockable(Mixins.Layoutable(Typographic));
const Iconable = Mixins.Glyphable(Typographic);
const Captionable = Mixins.Captionable(Typographic);
const Collectable = Mixins.Sourceable(
  Mixins.Captionable(Mixins.Shapeable(Block))
);
const Embeddable = Mixins.Captionable(
  Mixins.Sourceable(Mixins.Shapeable(Block))
);

// Definitions
export class PageBlock
  extends Pageable<Blocks.Page>
  implements Blocks.Template<Blocks.Page> {}

export class CollectionViewPageBlock
  extends Pageable<Blocks.CollectionViewPage>
  implements Blocks.Template<Blocks.CollectionViewPage> {}

export class BookmarkBlock
  extends Linkable<Blocks.Bookmark>
  implements Blocks.Template<Blocks.Bookmark>
{
  get bookmarkIcon(): string {
    return getProperty(this.format, "bookmark_icon", "");
  }

  get bookmarkCover(): string {
    return getProperty(this.format, "bookmark_cover", "");
  }
}

export class TextBlock
  extends Typographic<Blocks.Text>
  implements Blocks.Template<Blocks.Text> {}

export class BulletedListBlock
  extends Typographic<Blocks.BulletedList>
  implements Blocks.Template<Blocks.BulletedList> {}

export class NumberedListBlock
  extends Typographic<Blocks.NumberedList>
  implements Blocks.Template<Blocks.NumberedList> {}

export class HeaderBlock
  extends Typographic<Blocks.Header>
  implements Blocks.Template<Blocks.Header> {}

export class SubHeaderBlock
  extends Typographic<Blocks.SubHeader>
  implements Blocks.Template<Blocks.SubHeader> {}

export class SubSubHeaderBlock
  extends Typographic<Blocks.SubSubHeader>
  implements Blocks.Template<Blocks.SubSubHeader> {}

export class QuoteBlock
  extends Typographic<Blocks.Quote>
  implements Blocks.Template<Blocks.Quote> {}

export class EquationBlock
  extends Typographic<Blocks.Equation>
  implements Blocks.Template<Blocks.Equation> {}

export class TodoBlock
  extends Typographic<Blocks.Todo>
  implements Blocks.Template<Blocks.Todo>
{
  get checked(): Decorated {
    const value = getProperty(this.properties, "checked", [["No"]]);
    return new Decorated(value);
  }

  get isChecked(): boolean {
    return this.checked.asString === "Yes";
  }
}

export class TableOfContentsBlock
  extends Typographic<Blocks.TableOfContents>
  implements Blocks.Template<Blocks.TableOfContents> {}

export class CalloutBlock
  extends Iconable<Blocks.Callout>
  implements Blocks.Template<Blocks.Callout> {}

export class ToggleBlock
  extends Typographic<Blocks.Toggle>
  implements Blocks.Template<Blocks.Toggle> {}

export class CodeBlock
  extends Captionable<Blocks.Code>
  implements Blocks.Template<Blocks.Code>
{
  get code(): string {
    const value = getProperty(this.properties, "title", [[""]]);
    return new Decorated(value).asString;
  }

  get language(): Decorated {
    const value = getProperty(this.properties, "language", [["javascript"]]);
    return new Decorated(value);
  }
}

export class CollectionViewBlock
  extends Collectable<Blocks.CollectionView>
  implements Blocks.Template<Blocks.CollectionView>
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
  extends Embeddable<Blocks.Image>
  implements Blocks.Template<Blocks.Image> {}

export class EmbedBlock
  extends Embeddable<Blocks.Embed>
  implements Blocks.Template<Blocks.Embed> {}

export class GistBlock
  extends Embeddable<Blocks.Gist>
  implements Blocks.Template<Blocks.Gist> {}

export class VideoBlock
  extends Embeddable<Blocks.Video>
  implements Blocks.Template<Blocks.Video> {}

export class FigmaBlock
  extends Embeddable<Blocks.Figma>
  implements Blocks.Template<Blocks.Figma> {}

export class TypeformBlock
  extends Embeddable<Blocks.Typeform>
  implements Blocks.Template<Blocks.Typeform> {}

export class CodepenBlock
  extends Embeddable<Blocks.Codepen>
  implements Blocks.Template<Blocks.Codepen> {}

export class ExcalidrawBlock
  extends Embeddable<Blocks.Excalidraw>
  implements Blocks.Template<Blocks.Excalidraw> {}

export class TweetBlock
  extends Embeddable<Blocks.Tweet>
  implements Blocks.Template<Blocks.Tweet> {}

export class MapsBlock
  extends Embeddable<Blocks.Maps>
  implements Blocks.Template<Blocks.Maps> {}

export class PdfBlock
  extends Embeddable<Blocks.Pdf>
  implements Blocks.Template<Blocks.Pdf> {}

export class AudioBlock
  extends Embeddable<Blocks.Audio>
  implements Blocks.Template<Blocks.Audio> {}

export class GoogleDriveBlock
  extends Embeddable<Blocks.Drive>
  implements Blocks.Template<Blocks.Drive>
{
  get driveStatus(): Blocks.Format.DriveStatus {
    const defaultDriveStatus = { authed: false, last_fetched: Date.now() };
    return getProperty(this.format, "drive_status", defaultDriveStatus);
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

    return getProperty(this.format, "drive_properties", defaultDriveProperties);
  }
}

const Fileable = Mixins.Titleable(Embeddable);
export class FileBlock
  extends Fileable<Blocks.File>
  implements Blocks.Template<Blocks.File>
{
  get size(): Decorated {
    const value = getProperty(this.properties, "size", [[""]]);
    return new Decorated(value);
  }
}

export class AliasBlock
  extends Block<Blocks.Alias>
  implements Blocks.Template<Blocks.Alias>
{
  get aliasPointer(): Blocks.Format.AliasPointer {
    const defaultAliasPointer = {
      id: "",
      table: "",
      spaceid: "",
    };

    return getProperty(this.format, "alias_pointer", defaultAliasPointer);
  }
}

export class TransclusionContainerBlock
  extends Block<Blocks.TransclusionContainer>
  implements Blocks.Template<Blocks.TransclusionContainer> {}

export class TransclusionReferenceBlock
  extends Block<Blocks.TransclusionReference>
  implements Blocks.Template<Blocks.TransclusionReference>
{
  get copiedFromPointer(): Blocks.Format.Pointer {
    const defaultPointer = {
      id: "",
      spaceid: "",
    };

    return getProperty(this.format, "copied_from_pointer", defaultPointer);
  }

  get transclusionReferencePointer(): Blocks.Format.Pointer {
    const defaultPointer = {
      id: "",
      spaceid: "",
    };

    return getProperty(
      this.format,
      "transclusion_reference_pointer",
      defaultPointer
    );
  }
}

export class ColumnBlock
  extends Block<Blocks.Column>
  implements Blocks.Template<Blocks.Column>
{
  get columnRatio(): number {
    return getProperty(this.format, "column_ratio", 0);
  }
}

export class DividerBlock
  extends Block<Blocks.Divider>
  implements Blocks.Template<Blocks.Divider> {}

export class ColumnListBlock
  extends Block<Blocks.ColumnList>
  implements Blocks.Template<Blocks.ColumnList> {}
