import { Decorated, Property, Definition } from "@entities";
import { Domain, Api } from "@types";

type Url = { text: string; href: string };

export class UrlDefinition extends Definition<Api.Collections.Schema.Url> {
  readonly type = "url" as const;
  // array of urls in the format: [ url, [[ "a", url ]] ]
  decorate(property: Property<Domain.Definitions.Url>): Url[] {
    const getUrls = (decorations: Api.Formats.Decoration[]) => {
      return decorations.map(
        (decoration): Url => ({
          text: decoration[0],
          href: new Decorated(decoration[1] as Api.Formats.Decoration[])
            .asString,
        })
      );
    };

    return property.data.unwrap(getUrls);
  }
}
