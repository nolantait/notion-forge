import { Ability } from "@mixins";
import { Blocks } from "@types";

type TweetDTO = Blocks.Template<Blocks.Tweet>;
export class TweetBlock
  extends Ability.Embeddable<Blocks.Tweet>
  implements Blocks.Template<Blocks.Tweet> {}
