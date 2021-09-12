import React from "react";
import { UserFormat, ExternalLinkFormat, Block } from "notion-types";
import { useNotionContext } from "../../context";

import { FormatUser } from "./format-user";

export const FormatExternalPage = (
  decorator: ExternalLinkFormat,
  block: Block,
  linkProps?: any
): React.ReactNode => {
  const { recordMap, mapPageUrl, components } = useNotionContext();
  // link to an external block (outside of the current workspace)
  const linkType = decorator[1][0];
  const id = decorator[1][1];

  switch (linkType) {
    case "u":
      return FormatUser(decorator[1] as UserFormat, block);

    default: {
      const linkedBlock = recordMap.block[id]?.value;

      if (!linkedBlock) {
        console.log('"‣" missing block', linkType, id);
        return null;
      }

      return (
        <components.pageLink
          className="notion-link"
          href={mapPageUrl(id)}
          {...linkProps}
          target="_blank"
          rel="noopener noreferrer"
        >
          <components.pageTitle block={linkedBlock} />
        </components.pageLink>
      );
    }
  }
};
