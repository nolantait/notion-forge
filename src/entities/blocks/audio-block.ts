import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class AudioBlock
  extends Embeddable<Blocks.Audio>
  implements Blocks.Template<Blocks.Audio> {}
