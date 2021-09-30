import { Ability } from "@mixins";
import { Blocks } from "@types";

export class TypeformBlock
  extends Ability.Embeddable<Blocks.Typeform>
  implements Blocks.Template<Blocks.Typeform> {}
