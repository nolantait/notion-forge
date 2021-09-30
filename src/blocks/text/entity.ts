import { Ability } from "@mixins";
import { Blocks } from "@types";

export class TextBlock
  extends Ability.Typographic<Blocks.Text>
  implements Blocks.Template<Blocks.Text> {}
