import { Blocks } from "@types";
import { Layoutable } from "../behaviour";

export class CollectionViewPageBlock
  extends Layoutable<Blocks.CollectionViewPage>
  implements Blocks.Template<Blocks.CollectionViewPage>
{
  get viewIds(): Blocks.ID[] {
    return this.dto.view_ids;
  }

  get collectionId(): Blocks.ID {
    return this.dto.collection_id;
  }
}
