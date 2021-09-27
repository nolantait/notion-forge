import { Some, None, Option } from "excoptional";
import { Linkable } from "../behaviour";
import { Blocks } from "@types";

export class BookmarkBlock
  extends Linkable<Blocks.Bookmark>
  implements Blocks.Template<Blocks.Bookmark>
{
  get bookmarkIcon(): Option<string> {
    if (!this._format?.bookmark_icon) return None();
    return Some(this._format.bookmark_icon);
  }

  get bookmarkCover(): Option<string> {
    if (!this._format?.bookmark_cover) return None();
    return Some(this._format.bookmark_cover);
  }
}
