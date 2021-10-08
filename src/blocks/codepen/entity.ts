import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class CodepenBlock
  extends Traits.Captionable(
    Ability.Embeddable<Api.Blocks.Codepen>(Domain.Block)
  )
  implements Domain.Blocks.Template<Api.Blocks.Codepen> {}
