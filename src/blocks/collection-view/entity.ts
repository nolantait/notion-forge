import { Some, None, Option } from "excoptional";
import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class CollectionViewBlock
  extends Ability.Layoutable<Api.Blocks.CollectionView>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.CollectionView>
{
  readonly viewIds: Domain.Blocks.ID[];
  readonly collectionId: Domain.Blocks.ID;
  readonly collectionPointer: Option<Domain.Pointer>;

  constructor(...args: any[]) {
    super(...args);
    this.viewIds = this.dto.view_ids;
    this.collectionId = this.dto.collection_id;
    this.collectionPointer = this.format.then((format) => {
      const value = format?.collection_pointer;
      if (!value) return None();
      return Some(value);
    });
  }
}
