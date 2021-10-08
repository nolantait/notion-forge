import type { Mixins } from "@types";
import { Traits } from "./";
import { Block } from "@entities";

export type IsCaptionable = Mixins.WithTrait<Traits.IsCaptionable> &
  Mixins.WithTrait<Traits.IsTitleable>;

export function Captionable<T extends IsCaptionable>(
  Base: Mixins.Constructor<Block<T>>
) {
  return Traits.Captionable(Traits.Titleable(Base));
}
