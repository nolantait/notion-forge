import { Ability } from "@mixins";
import { Blocks } from "@types";

export class QuoteBlock
  extends Ability.Typographic<Blocks.Quote>
  implements Blocks.Template<Blocks.Quote> {}
