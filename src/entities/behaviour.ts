import * as Mix from "./mixins";
import { Block } from "@entities";

export const Typographic = Mix.Titleable(Mix.Colorable(Block));
export const Captionable = Mix.Captionable(Typographic);
export const Linkable = Mix.Linkable(
  Mix.Captionable(Mix.Titleable(Mix.Colorable(Block)))
);
export const Iconable = Mix.Glyphable(Typographic);
export const Layoutable = Mix.Layoutable(Iconable);
export const Collectable = Mix.Sourceable(
  Mix.Shapeable(Mix.Captionable(Block))
);
export const Embeddable = Mix.Sourceable(Mix.Shapeable(Mix.Captionable(Block)));
