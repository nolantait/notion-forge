import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class VideoBlock
  extends Ability.Embeddable<Api.Blocks.Video>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Video> {}
