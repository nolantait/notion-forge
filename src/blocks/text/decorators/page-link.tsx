import React from "react";

import { Api, View } from "@types";
import { useNotionContext } from "@context";
import { PageLink, PageLinkTitle } from "@components";

export type Props = {
  decoration: Api.Formats.PageFormat;
  linkProps?: React.HTMLProps<HTMLAnchorElement>;
};

export const PageLinkDecorator: View.Component<Props> = ({
  decoration,
  linkProps,
}) => {
  const { recordMap } = useNotionContext();
  const blockId = decoration[1];
  const linkType = decoration[0];
  const linkedBlock = recordMap.findBlock(blockId).getOrElse(undefined);

  if (!linkedBlock) {
    throw new Error(`Missing block ${linkType} ${blockId}`);
  }

  const href = recordMap.mapPageUrl(blockId);

  return (
    <PageLink
      className="notion-link"
      href={href}
      {...linkProps}
      blockId={blockId}
      target="_blank"
      rel="noopener noreferrer"
    >
      <PageLinkTitle block={linkedBlock} />
    </PageLink>
  );
};
