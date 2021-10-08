import { Option, Some, None } from "excoptional";
import { Ability } from "@mixins";
import { Domain, Api } from "@types";
import { Decorated } from "@entities";

export class CodeBlock
  extends Ability.Captionable<Api.Blocks.Code>(Domain.Block)
  implements Domain.Blocks.Template<Api.Blocks.Code>
{
  readonly language: Option<Decorated>;
  readonly code: string;

  constructor(...args: any[]) {
    super(...args);
    this.language = this.properties.then((properties) => {
      const value = properties?.language;
      if (!value) return None();
      return Some(new Decorated(value));
    });
    this.code = this.title.getOrElse(new Decorated()).asString;
  }
}
