import { Traits } from "./";
import { Block } from "@entities";

export const Captionable = Traits.Captionable(
  Traits.Colorable(Traits.Titleable(Block))
);
