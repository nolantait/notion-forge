import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class CodepenBlock
  extends Embeddable<Blocks.Codepen>
  implements Blocks.Template<Blocks.Codepen> {}
