import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Components } from "@types";
import * as Blocks from "@blocks";

export type Props = React.HTMLProps<HTMLAnchorElement> & { block: Blocks.Any };

export const Link: Components.Presenter<Props> = ({
  className,
  block,
  ...rest
}) => {
  const { components, recordMap } = useNotionContext();
  const pageLinkStyle = cs(
    "notion-page-link",
    `notion-${block.blockColor}`,
    className
  );

  const signedUrl = recordMap.getSignedUrl(block.id).getOrElse({ href: "#" });

  return (
    <a className={pageLinkStyle} href={signedUrl.href} {...rest}>
      <components.pageTitle block={block} />
    </a>
  );
};
