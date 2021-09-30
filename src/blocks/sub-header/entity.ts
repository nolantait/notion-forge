import { Ability } from "@mixins";
import { Blocks } from "@types";

export class SubHeaderBlock
  extends Ability.Typographic<Blocks.SubHeader>
  implements Blocks.Template<Blocks.SubHeader> {}
