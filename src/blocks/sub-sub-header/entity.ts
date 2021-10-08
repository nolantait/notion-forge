import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class SubSubHeaderBlock
  extends Ability.Iconable<Api.Blocks.SubSubHeader>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.SubSubHeader> {}
