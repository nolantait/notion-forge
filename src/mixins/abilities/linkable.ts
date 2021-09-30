import { Traits } from "./";
import { Block } from "@entities";

export const Linkable = Traits.Linkable(
  Traits.Captionable(Traits.Colorable(Traits.Titleable(Block)))
);
