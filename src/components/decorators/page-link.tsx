import React from "react";

import { Notion } from "@types";
import { useNotionContext } from "@context";

interface DecoratedPageLinkProps {
  decoration: Notion.PageFormat;
  linkProps?: any;
}

export const DecoratedPageLink = ({
  decoration,
  linkProps,
}: DecoratedPageLinkProps): React.ReactElement => {
  const { components, recordMap, mapPageUrl } = useNotionContext();
  const blockId = decoration[1];
  const linkType = decoration[0];
  const linkedBlock = recordMap.block[blockId]?.value;

  if (!linkedBlock) {
    throw new Error(`Missing block ${linkType} ${blockId}`);
  }

  const pageBlock = linkedBlock as Notion.PageBlock;

  return (
    <components.pageLink
      className="notion-link"
      href={mapPageUrl(blockId)}
      {...linkProps}
      target="_blank"
      rel="noopener noreferrer"
    >
      <components.pageTitle block={pageBlock} />
    </components.pageLink>
  );
};
