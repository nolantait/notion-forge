import { Ability } from "@mixins";
import { Blocks } from "@types";

export class CalloutBlock
  extends Ability.Iconable<Blocks.Callout>
  implements Blocks.Template<Blocks.Callout> {}
