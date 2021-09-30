import { Ability } from "@mixins";
import { Blocks } from "@types";

export class PdfBlock
  extends Ability.Embeddable<Blocks.Pdf>
  implements Blocks.Template<Blocks.Pdf> {}
