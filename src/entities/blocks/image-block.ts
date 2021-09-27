import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class ImageBlock
  extends Embeddable<Blocks.Image>
  implements Blocks.Template<Blocks.Image> {}
