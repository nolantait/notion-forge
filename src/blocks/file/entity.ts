import { Option, Some, None } from "excoptional";
import { Ability } from "@mixins";
import { Decorated } from "@entities";
import { Domain, Api } from "@types";

export class FileBlock
  extends Ability.Attachable<Api.Blocks.File>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.File>
{
  readonly size: Option<Decorated>;

  constructor(...args: any[]) {
    super(...args);
    this.size = this.properties.then((properties) => {
      const value = properties?.size;
      if (!value) return None();
      return Some(new Decorated(value));
    });
  }
}
