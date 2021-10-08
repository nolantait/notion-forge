import { Decorated } from "@entities";
import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class TodoBlock
  extends Ability.Iconable<Api.Blocks.Todo>(Domain.Block)
  implements Omit<Domain.Blocks.Template<Api.Blocks.Todo>, "checked">
{
  get checked(): boolean {
    const value = new Decorated(this.dto.properties?.checked);
    const isChecked = value.asString === "Yes";
    return isChecked;
  }
}
