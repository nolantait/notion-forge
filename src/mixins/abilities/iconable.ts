import { Traits } from "./";
import { Block } from "@entities";

export const Iconable = Traits.Iconable(
  Traits.Colorable(Traits.Titleable(Block))
);
