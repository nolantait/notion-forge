import { Blocks } from "@types";
import { Ability } from "@mixins";

export class CollectionViewPageBlock
  extends Ability.Layoutable<Blocks.CollectionViewPage>
  implements Blocks.Template<Blocks.CollectionViewPage>
{
  get viewIds(): Blocks.ID[] {
    return this.dto.view_ids;
  }

  get collectionId(): Blocks.ID {
    return this.dto.collection_id;
  }
}
