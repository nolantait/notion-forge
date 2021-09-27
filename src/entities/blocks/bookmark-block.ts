import { Blocks } from "@types";
import { Linkable } from "../behaviour";

export class BookmarkBlock
  extends Linkable<Blocks.CollectionViewPage>
  implements Blocks.Template<Blocks.CollectionViewPage>
{
  get bookmarkIcon(): Option<stirng> {}

  get bookmarkCover(): Option<string> {}
}
