import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class ToggleBlock
  extends Ability.Iconable<Api.Blocks.Toggle>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Toggle> {}
