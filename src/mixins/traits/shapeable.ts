import { Some, None, Option } from "excoptional";
import { Domain, Api, Mixins } from "@types";

export type IsShapeable = {
  format?: Api.Blocks.Format.Block;
};

export type HasShape = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsShapeable>>
>;

export type IShapeable = {
  blockWidth: Option<number>;
  blockHeight: Option<number>;
  blockAspectRatio: Option<number>;
  blockPreserveScale: Option<boolean>;
  blockFullWidth: Option<boolean>;
  blockPageWidth: Option<boolean>;
};

export function Shapeable<TBase extends HasShape>(
  Base: TBase
): Mixins.Constructor<IShapeable> & TBase {
  return class Shapeable extends Base implements IShapeable {
    readonly blockWidth: Option<number>;
    readonly blockHeight: Option<number>;
    readonly blockAspectRatio: Option<number>;
    readonly blockPreserveScale: Option<boolean>;
    readonly blockFullWidth: Option<boolean>;
    readonly blockPageWidth: Option<boolean>;

    constructor(...args: any[]) {
      super(...args);
      this.blockWidth = this.format.then((format) => {
        const value = format?.block_width;
        if (!value) return None();
        return Some(value);
      });
      this.blockHeight = this.format.then((format) => {
        const value = format?.block_height;
        if (!value) return None();
        return Some(value);
      });
      this.blockAspectRatio = this.format.then((format) => {
        const value = format?.block_aspect_ratio;
        if (!value) return None();
        return Some(value);
      });
      this.blockPreserveScale = this.format.then((format) => {
        const value = format?.block_preserve_scale;
        if (!value) return None();
        return Some(value);
      });
      this.blockFullWidth = this.format.then((format) => {
        const value = format?.block_full_width;
        if (!value) return None();
        return Some(value);
      });
      this.blockPageWidth = this.format.then((format) => {
        const value = format?.block_page_width;
        if (!value) return None();
        return Some(value);
      });
    }
  };
}
