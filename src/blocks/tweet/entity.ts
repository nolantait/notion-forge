import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class TweetBlock
  extends Traits.Captionable(Ability.Embeddable<Api.Blocks.Tweet>(Domain.Block))
  implements Domain.Blocks.Template<Api.Blocks.Tweet> {}
