import { Decorated, Definition } from "@entities";
import { Api } from "@types";

type File = { filename: string; url: string };
export class FileDefinition extends Definition<Api.Collections.Schema.File> {
  readonly type = "file" as const;
  // array of files in the format: [ filename, [[ "a", url ]] ]

  _format(decorated: Decorated): File[] {
    const getFiles = (decorations: Api.Formats.Decoration[]) => {
      return decorations.map(
        (decoration): File => ({
          filename: decoration[0],
          url: new Decorated(decoration[1] as Api.Formats.Decoration[])
            .asString,
        })
      );
    };

    return decorated.unwrap(getFiles);
  }
}
