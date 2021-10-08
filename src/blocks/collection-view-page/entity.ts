import { Some, None, Option } from "excoptional";
import { Domain, Api } from "@types";
import { Ability } from "@mixins";

export class CollectionViewPageBlock
  extends Ability.Layoutable<Api.Blocks.CollectionViewPage>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.CollectionViewPage>
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
