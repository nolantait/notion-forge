import { Blocks } from "@types";
import { Block } from "@entities";

export class DividerBlock
  extends Block<Blocks.Divider>
  implements Blocks.Template<Blocks.Divider> {}
