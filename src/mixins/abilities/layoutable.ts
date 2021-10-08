import { Traits } from "./";
import type { Mixins } from "@types";
import { Block } from "@entities";

export type IsLayoutable = Mixins.WithTrait<Traits.IsTitleable> &
  Mixins.WithTrait<Traits.IsPageable> &
  Mixins.WithTrait<Traits.IsIconable> &
  Mixins.WithTrait<Traits.IsLockable>;

export function Layoutable<T extends Mixins.WithTrait<IsLayoutable>>(
  Base: Mixins.Constructor<Block<T>>
) {
  return Traits.Pageable(
    Traits.Lockable(Traits.Iconable(Traits.Titleable(Base)))
  );
}
