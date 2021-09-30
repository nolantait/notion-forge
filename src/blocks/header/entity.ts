import { Ability } from "@mixins";
import { Blocks } from "@types";

export class HeaderBlock
  extends Ability.Typographic<Blocks.Header>
  implements Blocks.Template<Blocks.Header> {}
