import { Traits } from "./";
import { Block } from "@entities";

export const Layoutable = Traits.Pageable(
  Traits.Lockable(Traits.Iconable(Traits.Colorable(Traits.Titleable(Block))))
);
