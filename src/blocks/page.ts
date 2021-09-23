import { Entities } from "@types";
import { Block, Mixins as Trait } from "@entities";

class Base extends Block<"page"> {}
const Mixin = Trait.Lockable(
  Trait.Colorable(Trait.Layoutable(Trait.Titleable(Base)))
);

export class PageBlock extends Mixin implements Entities.Factory<"page"> {}
