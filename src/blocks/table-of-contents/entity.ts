import { Ability } from "@mixins";
import { Blocks } from "@types";

export class TableOfContentsBlock
  extends Ability.Typographic<Blocks.TableOfContents>
  implements Blocks.Template<Blocks.TableOfContents> {}
