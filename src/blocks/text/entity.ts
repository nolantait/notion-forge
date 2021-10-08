import { Ability } from "@mixins";
import { Api, Domain } from "@types";

export class TextBlock
  extends Ability.Iconable<Api.Blocks.Text>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Text> {}
