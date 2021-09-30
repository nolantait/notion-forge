import { Ability } from "@mixins";
import { Blocks } from "@types";

export class NumberedListBlock
  extends Ability.Typographic<Blocks.NumberedList>
  implements Blocks.Template<Blocks.NumberedList> {}
