import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class TextBlock
  extends Typographic<Blocks.Text>
  implements Blocks.Template<Blocks.Text> {}
