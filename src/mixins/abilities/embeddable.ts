import { Traits } from "./";
import { Block } from "@entities";

export const Embeddable = Traits.Shapeable(
  Traits.Sourceable(Traits.Captionable(Block))
);
