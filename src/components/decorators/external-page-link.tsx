import React from "react";

import { Notion, DecoratedExternalPageProps } from "@types";
import { useNotionContext } from "@context";

import { DecoratedUser, DecoratedPageLink } from "./";

export const DecoratedExternalPageLink = ({
  decoration,
  block,
  linkProps,
}: DecoratedExternalPageProps): React.ReactElement => {
  const { recordMap } = useNotionContext();
  // link to an external block (outside of the current workspace)
  const linkType = decoration[1][0];
  const id = decoration[1][1];

  switch (linkType) {
    case "u": {
      if (!block) return <></>;

      return (
        <DecoratedUser
          decoration={decoration[1] as Notion.UserFormat}
          block={block}
        />
      );
    }
    default: {
      const linkedBlock = recordMap.block[id]?.value;

      if (!linkedBlock) {
        throw new Error(`Missing block ${linkType} ${id}`);
      }

      const format: Notion.PageFormat = ["p", id];

      return <DecoratedPageLink decoration={format} linkProps={linkProps} />;
    }
  }
};
