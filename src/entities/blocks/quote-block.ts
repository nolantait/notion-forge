import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class QuoteBlock
  extends Typographic<Blocks.Quote>
  implements Blocks.Template<Blocks.Quote> {}
