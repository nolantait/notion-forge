import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class SubHeaderBlock
  extends Ability.Iconable<Api.Blocks.SubHeader>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.SubHeader> {}
