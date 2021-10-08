import type { Mixins } from "@types";
import { Block } from "@entities";
import { Traits } from "./";

type IsIconable = Mixins.WithTrait<Traits.IsColorable> &
  Mixins.WithTrait<Traits.IsTitleable> &
  Mixins.WithTrait<Traits.IsIconable>;
// type Test = Mixins.WithTrait<IsIconable>;
export function Iconable<T extends IsIconable>(
  Base: Mixins.Constructor<Block<T>>
) {
  return Traits.Iconable(Traits.Colorable(Traits.Titleable(Base)));
}
