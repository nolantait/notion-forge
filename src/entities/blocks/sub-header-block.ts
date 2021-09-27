import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class SubHeaderBlock
  extends Typographic<Blocks.SubHeader>
  implements Blocks.Template<Blocks.SubHeader> {}
