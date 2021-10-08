import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class TypeformBlock
  extends Traits.Captionable(
    Ability.Embeddable<Api.Blocks.Typeform>(Domain.Block)
  )
  implements Domain.Blocks.Template<Api.Blocks.Typeform> {}
