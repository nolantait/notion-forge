import { Decorated, Definition } from "@entities";
import { Api } from "@types";

type Url = { text: string; href: string };

export class UrlDefinition extends Definition<Api.Collections.Schema.Url> {
  readonly type = "url" as const;
  // array of urls in the format: [ url, [[ "a", url ]] ]
  _format(decorated: Decorated): Url[] {
    const getUrls = (decorations: Api.Formats.Decoration[]) => {
      return decorations.map(
        (decoration): Url => ({
          text: decoration[0],
          href: new Decorated(decoration[1] as Api.Formats.Decoration[])
            .asString,
        })
      );
    };

    return decorated.unwrap(getUrls);
  }
}
