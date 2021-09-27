import { Blocks } from "@types";
import { Layoutable } from "../behaviour";

export class PageBlock
  extends Layoutable<Blocks.Page>
  implements Blocks.Template<Blocks.Page> {}
