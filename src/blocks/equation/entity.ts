import { Ability } from "@mixins";
import { Blocks } from "@types";

export class EquationBlock
  extends Ability.Typographic<Blocks.Equation>
  implements Blocks.Template<Blocks.Equation> {}
