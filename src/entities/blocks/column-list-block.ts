import { Blocks } from "@types";
import { Block } from "../";

export class ColumnListBlock
  extends Block<Blocks.ColumnList>
  implements Blocks.Template<Blocks.ColumnList> {}
