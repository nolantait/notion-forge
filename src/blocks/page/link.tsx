import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Domain, View } from "@types";
import { PageLinkTitle } from "@components";

export type Props = React.HTMLProps<HTMLAnchorElement> & {
  block: Domain.Blocks.Page.Entity;
};

export const Link: View.Component<Props> = ({ className, block, ...rest }) => {
  const { recordMap } = useNotionContext();
  const pageLinkStyle = cs("notion-page-link", className);

  const signedUrl = recordMap.getSignedUrl(block.id).getOrElse({ href: "#" });

  return (
    <a className={pageLinkStyle} href={signedUrl.href} {...rest}>
      <PageLinkTitle block={block} />
    </a>
  );
};
