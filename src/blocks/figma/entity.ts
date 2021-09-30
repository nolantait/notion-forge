import { Ability } from "@mixins";
import { Blocks } from "@types";

export class FigmaBlock
  extends Ability.Embeddable<Blocks.Figma>
  implements Blocks.Template<Blocks.Figma> {}
