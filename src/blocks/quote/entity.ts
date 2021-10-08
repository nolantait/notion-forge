import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class QuoteBlock
  extends Ability.Iconable<Api.Blocks.Quote>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Quote> {}
