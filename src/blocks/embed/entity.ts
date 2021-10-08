import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class EmbedBlock
  extends Traits.Captionable(Ability.Embeddable<Api.Blocks.Embed>(Domain.Block))
  implements Domain.Blocks.Template<Api.Blocks.Embed> {}
