import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class NumberedListBlock
  extends Ability.Iconable<Api.Blocks.NumberedList>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.NumberedList> {}
