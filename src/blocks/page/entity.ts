import { Some, None, Option } from "excoptional";
import { Domain, Api } from "@types";
import { Ability } from "@mixins";
import { CollectionViewProperty, Decorated } from "@entities";

type PropertyAccess = {
  [key: string]: Api.Formats.Decoration[] | undefined;
};

export class PageBlock
  extends Ability.Layoutable<Api.Blocks.Page>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Page>
{
  getPageProperty(property: CollectionViewProperty): Option<Decorated> {
    const value = this.properties.getOrElse(undefined);
    if (!value) return None();
    const mappedValue: PropertyAccess = value;
    const decoration = mappedValue[property.id];
    return Some(new Decorated(decoration));
  }
}
