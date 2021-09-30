import { Traits } from "./";
import { Block } from "@entities";

export const Collectable = Traits.Shapeable(
  Traits.Sourceable(Traits.Captionable(Block))
);
