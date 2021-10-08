import { Ability } from "@mixins";
import { Api, Domain } from "@types";

export class CalloutBlock
  extends Ability.Iconable<Api.Blocks.Callout>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Callout> {}
