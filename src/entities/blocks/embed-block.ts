import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class EmbedBlock
  extends Embeddable<Blocks.Embed>
  implements Blocks.Template<Blocks.Embed> {}
