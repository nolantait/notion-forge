import { Some, None, Option } from "excoptional";
import { Decorated } from "@entities";
import { Domain, Api, Mixins } from "@types";

export type IsSourceable =
  | {
      format?: Api.Blocks.Format.Source;
    }
  | {
      properties?: Api.Blocks.Properties.Source;
    };

export type HasSource = Mixins.Constructor<
  Domain.Block<Mixins.WithTrait<IsSourceable>>
>;

export type ISourceable = {
  source: Option<Decorated>;
  displaySource: Option<string>;
};

export function Sourceable<TBase extends HasSource>(
  Base: TBase
): Mixins.Constructor<ISourceable> & TBase {
  return class Sourceable extends Base implements ISourceable {
    readonly source: Option<Decorated>;
    readonly displaySource: Option<string>;

    constructor(...args: any[]) {
      super(...args);
      this.source = this.properties.then((properties) => {
        const value = properties?.source;
        if (!value) return None();
        return Some(new Decorated(value));
      });

      const maybeFormat = Object.assign(
        { display_source: undefined },
        this.format.getOrElse({ display_source: undefined })
      );
      this.displaySource = maybeFormat?.display_source
        ? Some(maybeFormat.display_source)
        : this.source.getOrElse(undefined)
        ? Some(this.source.getOrElse(new Decorated()).asString)
        : None();
    }
  };
}
