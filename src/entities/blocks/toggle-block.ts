import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class ToggleBlock
  extends Typographic<Blocks.Toggle>
  implements Blocks.Template<Blocks.Toggle> {}
