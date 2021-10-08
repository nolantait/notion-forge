import { Ability } from "@mixins";
import { Domain, Api } from "@types";

export class BulletedListBlock
  extends Ability.Iconable<Api.Blocks.BulletedList>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.BulletedList> {}
