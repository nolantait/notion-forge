import React from "react";

import { Api, View } from "@types";
import { useNotionContext } from "@context";

import { UserDecorator } from "./user";
import { PageLinkDecorator } from "./page-link";

export type Props = {
  decoration: Api.Formats.ExternalLinkFormat;
  linkProps: React.HTMLProps<HTMLAnchorElement>;
};

export const ExternalPageLinkDecorator: View.Component<Props> = ({
  decoration,
  linkProps = {},
}) => {
  const { recordMap } = useNotionContext();
  // link to an external block (outside of the current workspace)
  const linkType = decoration[1][0];
  const id = decoration[1][1];

  switch (linkType) {
    case "u": {
      return <UserDecorator decoration={decoration[1]} />;
    }
    default: {
      const linkedBlock = recordMap.findBlock(id).getOrElse(undefined);

      if (!linkedBlock) {
        throw new Error(`Missing block ${linkType} ${id}`);
      }

      const format: Api.Formats.PageFormat = ["p", id];

      return <PageLinkDecorator decoration={format} linkProps={linkProps} />;
    }
  }
};
