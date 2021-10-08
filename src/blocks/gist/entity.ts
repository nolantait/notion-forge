import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class GistBlock
  extends Traits.Captionable(Ability.Embeddable<Api.Blocks.Gist>(Domain.Block))
  implements Domain.Blocks.Template<Api.Blocks.Gist> {}
