import { Some, None, Option } from "excoptional";
import { Domain, Api, Mixins } from "@types";

export type HasColor = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsColorable>>
>;

export type IsColorable = { format?: Api.Blocks.Format.Color };

export type IColorable = {
  blockColor: Option<Domain.Color>;
};

export function Colorable<TBase extends HasColor>(
  Base: TBase
): Mixins.Constructor<IColorable> & TBase {
  return class Colorable extends Base implements IColorable {
    readonly blockColor: Option<Domain.Color>;

    constructor(...args: any[]) {
      super(...args);
      this.blockColor = this.format.then((format) => {
        const value = format?.block_color;
        if (!value) return None();
        return Some(value);
      });
    }
  };
}
