import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class NumberedListBlock
  extends Typographic<Blocks.NumberedList>
  implements Blocks.Template<Blocks.NumberedList> {}
