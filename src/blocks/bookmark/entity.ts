import { Option, None, Some } from "excoptional";
import { Ability } from "@mixins";
import { Api, Domain } from "@types";

export class BookmarkBlock
  extends Ability.Linkable<Api.Blocks.Bookmark>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Bookmark>
{
  readonly bookmarkIcon: Option<string>;
  readonly bookmarkCover: Option<string>;

  constructor(...args: any[]) {
    super(...args);
    this.bookmarkIcon = this.format.then((format) => {
      const value = format?.bookmark_icon;
      if (!value) return None();
      return Some(value);
    });
    this.bookmarkCover = this.format.then((format) => {
      const value = format?.bookmark_cover;
      if (!value) return None();
      return Some(value);
    });
  }
}
