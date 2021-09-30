import { Ability } from "@mixins";
import { Blocks } from "@types";

export class MapsBlock
  extends Ability.Embeddable<Blocks.Maps>
  implements Blocks.Template<Blocks.Maps> {}
