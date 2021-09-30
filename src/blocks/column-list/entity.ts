import { Blocks } from "@types";
import { Block } from "@entities";

export class ColumnListBlock
  extends Block<Blocks.ColumnList>
  implements Blocks.Template<Blocks.ColumnList> {}
