import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class EquationBlock
  extends Ability.Iconable<Api.Blocks.Equation>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Equation> {}
