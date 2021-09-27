import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class PdfBlock
  extends Embeddable<Blocks.Pdf>
  implements Blocks.Template<Blocks.Pdf> {}
