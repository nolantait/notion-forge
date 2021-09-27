import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class TypeformBlock
  extends Embeddable<Blocks.Typeform>
  implements Blocks.Template<Blocks.Typeform> {}
