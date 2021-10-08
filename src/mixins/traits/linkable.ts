import { Some, None, Option } from "excoptional";
import { Decorated } from "@entities";
import { Domain, Api, Mixins } from "@types";

export type HasLink = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsLinkable>>
>;

export type IsLinkable = {
  properties?: Api.Blocks.Properties.Link;
};

export type ILinkable = {
  link: Option<Decorated>;
  description: Option<Decorated>;
};

export function Linkable<TBase extends HasLink>(
  Base: TBase
): Mixins.Constructor<ILinkable> & TBase {
  return class Linkable extends Base implements ILinkable {
    readonly link: Option<Decorated>;
    readonly description: Option<Decorated>;

    constructor(...args: any[]) {
      super(...args);
      this.link = this.properties.then((properties) => {
        const value = properties?.link;
        if (!value) return None();
        return Some(new Decorated(value));
      });
      this.description = this.properties.then((properties) => {
        const value = properties?.description;
        if (!value) return None();
        return Some(new Decorated(value));
      });
    }
  };
}
