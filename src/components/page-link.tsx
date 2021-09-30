import React from "react";

import { Components } from "@types";
import { useNotionContext } from "@context";
import * as Blocks from "@blocks";

export type Props = {
  block: Blocks.Page.Entity;
} & React.HTMLProps<HTMLAnchorElement>;

export const Component: Components.Presenter<Props> = ({ block, ...rest }) => {
  const { recordMap } = useNotionContext();
  const signedUrl = recordMap.getSignedUrl(block).getOrElse(new URL(""));
  const href = signedUrl.href;

  return <a {...rest} {...{ href: href }} />;
};
