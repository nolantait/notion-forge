import type { Mixins } from "@types";
import { Traits } from "./";
import { Block } from "@entities";

export type IsCollectable = Mixins.WithTrait<Traits.IsCaptionable> &
  Mixins.WithTrait<Traits.IsSourceable> &
  Mixins.WithTrait<Traits.IsShapeable>;

//type Test = Mixins.WithTrait<IsCollectable>;
export function Collectable<T extends IsCollectable>(
  Base: Mixins.Constructor<Block<T>>
) {
  return Traits.Shapeable(Traits.Sourceable(Traits.Captionable(Base)));
}
