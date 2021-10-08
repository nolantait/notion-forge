import type { Mixins } from "@types";
import { Traits } from "./";
import { Block } from "@entities";

export type IsLinkable = Mixins.WithTrait<Traits.IsLinkable>;

export function Linkable<T extends IsLinkable>(
  Base: Mixins.Constructor<Block<T>>
) {
  return Traits.Linkable(
    Traits.Captionable(Traits.Colorable(Traits.Titleable(Base)))
  );
}
