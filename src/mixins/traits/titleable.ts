import { Some, None, Option } from "excoptional";
import { Decorated } from "@entities";
import { Domain, Api, Mixins } from "@types";

export type HasTitle = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsTitleable>>
>;

export type IsTitleable = { properties?: Api.Blocks.Properties.Title };

export type ITitleable = {
  title: Option<Decorated>;
};

export function Titleable<TBase extends HasTitle>(
  Base: TBase
): Mixins.Constructor<ITitleable> & TBase {
  return class Titleable extends Base implements ITitleable {
    readonly title: Option<Decorated>;

    constructor(...args: any[]) {
      super(...args);
      this.title = this.properties.then((properties) => {
        const value = properties?.title;
        if (!value) return None();
        return Some(new Decorated(this.dto.properties?.title));
      });
    }
  };
}
