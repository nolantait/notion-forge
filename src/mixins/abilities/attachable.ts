import type { Mixins } from "@types";
import { Traits } from "./";
import { Block } from "@entities";

export type IsAttachable = Mixins.WithTrait<Traits.IsCaptionable> &
  Mixins.WithTrait<Traits.IsSourceable> &
  Mixins.WithTrait<Traits.IsTitleable>;

export function Attachable<T extends IsAttachable>(
  Base: Mixins.Constructor<Block<T>>
) {
  return Traits.Sourceable(Traits.Captionable(Traits.Titleable(Base)));
}
