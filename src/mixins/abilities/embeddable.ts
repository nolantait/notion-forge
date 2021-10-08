import type { Mixins } from "@types";
import { Traits } from "./";
import { Block } from "@entities";

type CanEmbed = Mixins.WithTrait<Traits.IsShapeable> &
  Mixins.WithTrait<Traits.IsSourceable>;

export function Embeddable<T extends CanEmbed>(
  Base: Mixins.Constructor<Block<T>>
) {
  return Traits.Shapeable(Traits.Sourceable(Base));
}
