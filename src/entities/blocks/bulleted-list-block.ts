import { Typographic } from "../behaviour";
import { Blocks } from "@types";

export class BulletedListBlock
  extends Typographic<Blocks.BulletedList>
  implements Blocks.Template<Blocks.BulletedList> {}
