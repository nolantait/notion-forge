import { Option, Some, None } from "excoptional";
import { Domain, Api } from "@types";

export class AliasBlock
  extends Domain.Block<Api.Blocks.Alias>
  implements Domain.Blocks.Template<Api.Blocks.Alias>
{
  readonly aliasPointer: Option<Api.Blocks.Format.Pointer>;

  constructor(block: Api.Blocks.Alias) {
    super(block);
    this.aliasPointer = this.format.then((format) => {
      const value = format?.alias_pointer;
      if (!value) return None();
      return Some(value);
    });
  }
}
