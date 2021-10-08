import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class PdfBlock
  extends Ability.Embeddable<Api.Blocks.Pdf>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Pdf> {}
