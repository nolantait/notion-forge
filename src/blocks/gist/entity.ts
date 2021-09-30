import { Ability } from "@mixins";
import { Blocks } from "@types";

export class GistBlock
  extends Ability.Embeddable<Blocks.Gist>
  implements Blocks.Template<Blocks.Gist> {}
