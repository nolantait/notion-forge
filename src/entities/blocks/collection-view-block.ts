import { Collectable } from "../behaviour";
import { Blocks } from "@types";

export class CollectionViewBlock
  extends Collectable<Blocks.CollectionView>
  implements Blocks.Template<Blocks.CollectionView>
{
  get viewIds(): Blocks.ID[] {
    return this.dto.view_ids;
  }

  get collectionId(): Blocks.ID {
    return this.dto.collection_id;
  }
}
