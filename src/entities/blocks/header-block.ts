import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class HeaderBlock
  extends Typographic<Blocks.Header>
  implements Blocks.Template<Blocks.Header> {}
