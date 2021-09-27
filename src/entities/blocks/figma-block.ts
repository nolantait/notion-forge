import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class FigmaBlock
  extends Embeddable<Blocks.Figma>
  implements Blocks.Template<Blocks.Figma> {}
