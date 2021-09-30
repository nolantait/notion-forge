import { Some, None, Option } from "excoptional";
import { Blocks, Formats } from "@types";
import { Ability } from "@mixins";
import { TableProperty, Decorated } from "@entities";

type PropertyAccess = {
  [key: string]: Formats.Decoration[] | undefined;
};

export class PageBlock
  extends Ability.Layoutable<Blocks.Page>
  implements Blocks.Template<Blocks.Page>
{
  getPageProperty(property: TableProperty): Option<Decorated> {
    const value = this.properties.getOrElse(undefined);
    if (!value) return None();
    const mappedValue: PropertyAccess = value;
    const decoration = mappedValue[property.id];
    return Some(new Decorated(decoration));
  }
}
