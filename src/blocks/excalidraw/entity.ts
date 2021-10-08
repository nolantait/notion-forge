import { Traits, Ability } from "@mixins";
import { Domain, Api } from "@types";

export class ExcalidrawBlock
  extends Traits.Captionable(
    Ability.Embeddable<Api.Blocks.Excalidraw>(Domain.Block)
  )
  implements Domain.Blocks.Template<Api.Blocks.Excalidraw> {}
