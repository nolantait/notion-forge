import { Some, None, Option } from "excoptional";
import { Blocks, Formats } from "@types";
import { Layoutable } from "../behaviour";
import { TableProperty, Decorated } from "@entities";

type PropertyAccess = {
  [key: string]: Formats.Decoration[] | undefined;
};

export class PageBlock
  extends Layoutable<Blocks.Page>
  implements Blocks.Template<Blocks.Page>
{
  getPageProperty(property: TableProperty): Option<Decorated> {
    const value = this.properties.getOrElse(undefined);
    if (!value) return None();
    const mappedValue: PropertyAccess = value;
    const decoration = mappedValue[property.propertyId];
    return Some(new Decorated(decoration));
  }
}
