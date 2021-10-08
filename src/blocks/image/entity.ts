import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class ImageBlock
  extends Traits.Captionable(Ability.Embeddable<Api.Blocks.Image>(Domain.Block))
  implements Domain.Blocks.Template<Api.Blocks.Image> {}
