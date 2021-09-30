import { Ability } from "@mixins";
import { Blocks } from "@types";

export class BulletedListBlock
  extends Ability.Typographic<Blocks.BulletedList>
  implements Blocks.Template<Blocks.BulletedList> {}
