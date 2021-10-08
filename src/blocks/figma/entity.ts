import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class FigmaBlock
  extends Traits.Captionable(Ability.Embeddable<Api.Blocks.Figma>(Domain.Block))
  implements Domain.Blocks.Template<Api.Blocks.Figma> {}
