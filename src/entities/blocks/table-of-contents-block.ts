import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class TableOfContentsBlock
  extends Typographic<Blocks.TableOfContents>
  implements Blocks.Template<Blocks.TableOfContents> {}
