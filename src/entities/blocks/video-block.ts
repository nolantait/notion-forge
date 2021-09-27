import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class VideoBlock
  extends Embeddable<Blocks.Video>
  implements Blocks.Template<Blocks.Video> {}
