import { Ability } from "@mixins";
import { Blocks } from "@types";

export class ExcalidrawBlock
  extends Ability.Embeddable<Blocks.Excalidraw>
  implements Blocks.Template<Blocks.Excalidraw> {}
