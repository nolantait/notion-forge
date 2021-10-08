import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class MapsBlock
  extends Traits.Captionable(Ability.Embeddable<Api.Blocks.Maps>(Domain.Block))
  implements Domain.Blocks.Template<Api.Blocks.Maps> {}
