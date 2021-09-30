import { Decorated } from "@entities";
import { Ability } from "@mixins";
import { Blocks } from "@types";

export class TodoBlock
  extends Ability.Typographic<Blocks.Todo>
  implements Omit<Blocks.Template<Blocks.Todo>, "checked">
{
  get checked(): boolean {
    const value = new Decorated(this.dto.properties.checked);
    const isChecked = value.asString === "Yes";
    return isChecked;
  }
}
