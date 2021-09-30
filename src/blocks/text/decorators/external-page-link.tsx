import React from "react";

import { Formats, Components } from "@types";
import { useNotionContext } from "@context";
import { Block } from "@entities";

import { Decorator as DecoratedUser } from "./user";
import { Decorator as DecoratedPageLink } from "./page-link";

export type Props = {
  decoration: Formats.ExternalLinkFormat;
  block: Block;
  linkProps: React.HTMLProps<HTMLAnchorElement>;
};

export const ExternalPageLinkDecorator: Components.Presenter<Props> = ({
  decoration,
  block,
  linkProps = {},
}) => {
  const { recordMap } = useNotionContext();
  // link to an external block (outside of the current workspace)
  const linkType = decoration[1][0];
  const id = decoration[1][1];

  switch (linkType) {
    case "u": {
      if (!block) return <></>;

      return <DecoratedUser decoration={decoration[1]} block={block} />;
    }
    default: {
      const linkedBlock = recordMap.block[id]?.value;

      if (!linkedBlock) {
        throw new Error(`Missing block ${linkType} ${id}`);
      }

      const format: Formats.PageFormat = ["p", id];

      return <DecoratedPageLink decoration={format} linkProps={linkProps} />;
    }
  }
};
