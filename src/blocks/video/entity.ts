import { Ability } from "@mixins";
import { Blocks } from "@types";

export class VideoBlock
  extends Ability.Embeddable<Blocks.Video>
  implements Blocks.Template<Blocks.Video> {}
