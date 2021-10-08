import { Some, None, Option } from "excoptional";
import { Domain, Api, Mixins } from "@types";
import { Decorated } from "@entities";

export type IsCaptionable = { properties?: Api.Blocks.Properties.Caption };
//type Test = Mixins.WithTrait<IsCaptionable>;
export type HasCaption = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsCaptionable>>
>;

export type ICaptionable = {
  caption: Option<Decorated>;
};

export function Captionable<TBase extends HasCaption>(
  Base: TBase
): Mixins.Constructor<ICaptionable> & TBase {
  return class Captionable extends Base implements ICaptionable {
    readonly caption: Option<Decorated>;

    constructor(...args: any[]) {
      super(...args);
      this.caption = this.properties.then((properties) => {
        const value = properties?.caption;
        if (!value) return None();
        return Some(new Decorated(value));
      });
    }
  };
}
