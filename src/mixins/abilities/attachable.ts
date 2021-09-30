import { Traits } from "./";
import { Block } from "@entities";

export const Attachable = Traits.Shapeable(
  Traits.Sourceable(Traits.Captionable(Traits.Titleable(Block)))
);
