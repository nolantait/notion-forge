import { Ability } from "@mixins";
import { Blocks } from "@types";

export class ImageBlock
  extends Ability.Embeddable<Blocks.Image>
  implements Blocks.Template<Blocks.Image> {}
