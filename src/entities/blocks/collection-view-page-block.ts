import { Blocks } from "@types";
import { Layoutable } from "../behaviour";

export class CollectionViewPageBlock
  extends Layoutable<Blocks.CollectionViewPage>
  implements Blocks.Template<Blocks.CollectionViewPage> {}
