import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class HeaderBlock
  extends Ability.Iconable<Api.Blocks.Header>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Header> {}
