import { Ability } from "@mixins";
import { Blocks } from "@types";

export class ToggleBlock
  extends Ability.Typographic<Blocks.Toggle>
  implements Blocks.Template<Blocks.Toggle> {}
