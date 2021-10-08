import { Domain, Api } from "@types";
import { Ability } from "@mixins";

export class AudioBlock
  extends Ability.Embeddable<Api.Blocks.Audio>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Audio> {}
