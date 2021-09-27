import { Embeddable } from "../behaviour";
import { Blocks } from "@types";

export class GistBlock
  extends Embeddable<Blocks.Gist>
  implements Blocks.Template<Blocks.Gist> {}
