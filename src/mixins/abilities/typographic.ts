import { Traits } from "./";
import { Block } from "@entities";
import type { Mixins } from "@types";

type IsTypographic = Mixins.WithTrait<Traits.IsTitleable> &
  Mixins.WithTrait<Traits.IsColorable>;

// type Test = Mixins.WithTrait<IsTypographic>
export function Typographic<T extends IsTypographic>(
  Base: Mixins.Constructor<Block<T>>
) {
  return Traits.Colorable(Traits.Titleable(Base));
}
