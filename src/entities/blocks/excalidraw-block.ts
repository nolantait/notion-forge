import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class ExcalidrawBlock
  extends Embeddable<Blocks.Excalidraw>
  implements Blocks.Template<Blocks.Excalidraw> {}
