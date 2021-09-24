import { Entities } from "@types";
import { Block, Mixins as Trait } from "@entities";

class Base extends Block<"page"> {}
const Text = Trait.Colorable(Trait.Titleable(Base));
function Layout<T>(
  TBase: Trait.Constructor<T>,
  mixins: Trait.Constructor<T>[]
) {
  mixins.reduce((base, mix) => mix(base), Base);
}
const Mixin = Layout<Base>(Base, [Trait.Colorable]);

export class PageBlock extends Mixin implements Entities.Factory<"page"> {}
