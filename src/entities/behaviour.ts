import * as Mix from "./mixins";
import { Block } from "./";

export const Typographic = Mix.Titleable(Mix.Colorable(Block));
export const Captionable = Mix.Captionable(Typographic);
export const Linkable = Mix.Linkable(Captionable);
export const Iconable = Mix.Glyphable(Typographic);
export const Layoutable = Mix.Layoutable(Iconable);
export const Collectable = Mix.Sourceable(Mix.Shapeable(Captionable));
export const Embeddable = Mix.Sourceable(Mix.Shapeable(Mix.Captionable(Block)));
