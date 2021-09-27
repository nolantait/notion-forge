import { Option, Some, None } from "excoptional";
import { Captionable } from "../behaviour";
import { Blocks } from "@types";
import { Decorated } from "../";

export class CodeBlock
  extends Captionable<Blocks.Code>
  implements Blocks.Template<Blocks.Code>
{
  get language(): Option<Decorated> {
    const value = this._properties?.language;
    if (!value) return None();
    return Some(new Decorated(value));
  }

  get code(): string {
    return this.title.getOrElse(new Decorated()).asString;
  }
}
