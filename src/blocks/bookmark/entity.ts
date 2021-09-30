import { Some, None, Option } from "excoptional";
import { Ability } from "@mixins";
import { Blocks } from "@types";

export class BookmarkBlock
  extends Ability.Linkable<Blocks.Bookmark>
  implements Blocks.Template<Blocks.Bookmark>
{
  get bookmarkIcon(): string {
    return this._format.bookmark_icon ?? "";
  }

  get bookmarkCover(): string {
    return this._format.bookmark_cover ?? "";
  }
}
