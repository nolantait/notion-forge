import React from "react";

import { Components, Formats } from "@types";
import { useNotionContext } from "@context";

export type Props = {
  decoration: Formats.PageFormat;
  linkProps?: React.HTMLProps<HTMLAnchorElement>;
};

export const Decorator: Components.Presenter<Props> = ({
  decoration,
  linkProps,
}) => {
  const { components, recordMap, mapPageUrl } = useNotionContext();
  const blockId = decoration[1];
  const linkType = decoration[0];
  const linkedBlock = recordMap.block[blockId]?.value;

  if (!linkedBlock) {
    throw new Error(`Missing block ${linkType} ${blockId}`);
  }

  return (
    <components.pageLink
      className="notion-link"
      href={mapPageUrl(blockId)}
      {...linkProps}
      target="_blank"
      rel="noopener noreferrer"
    >
      <components.pageTitle block={linkedBlock} />
    </components.pageLink>
  );
};
