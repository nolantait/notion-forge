import { Some, None, Option } from "excoptional";
import { Domain, Api, Mixins } from "@types";

export type IsIconable = {
  format?: Api.Blocks.Format.Icon;
};

export type HasIcon = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsIconable>>
>;

export type IIconable = {
  pageIcon: Option<string>;
};

export function Iconable<TBase extends HasIcon>(
  Base: TBase
): Mixins.Constructor<IIconable> & TBase {
  return class Iconable extends Base implements IIconable {
    readonly pageIcon: Option<string>;

    constructor(...args: any[]) {
      super(...args);
      this.pageIcon = this.format.then((format) => {
        const value = format?.page_icon;
        if (!value) return None();
        return Some(value);
      });
    }
  };
}
