import { Ability } from "@mixins";
import { Blocks } from "@types";

export class EmbedBlock
  extends Ability.Embeddable<Blocks.Embed>
  implements Blocks.Template<Blocks.Embed> {}
