import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class MapsBlock
  extends Embeddable<Blocks.Maps>
  implements Blocks.Template<Blocks.Maps> {}
