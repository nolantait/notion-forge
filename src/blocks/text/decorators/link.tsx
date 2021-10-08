import React from "react";

import { View, Api } from "@types";
import { PageLink, Link } from "@components";
import { parsePageId } from "@utils";

export type Props = {
  decoration: ["a", string];
  linkProps: React.HTMLProps<HTMLAnchorElement>;
  linkProtocol?: Api.Core.LinkProtocol;
  element: React.ReactElement;
};

// ["a", external_or_relative_path]
export const LinkDecorator: View.Component<Props> = ({
  decoration,
  linkProps,
  linkProtocol,
  element,
}) => {
  const path = decoration[1];
  const pathname = path.substr(1);
  const id = parsePageId(pathname, { uuid: true });
  const isRelativePath = path[0] === "/";
  const externalUrl = linkProtocol
    ? `${linkProtocol}:${decoration[1]}`
    : decoration[1];
  const href = externalUrl;

  if (isRelativePath && id) {
    return (
      <PageLink blockId={id} className="notion-link" href={href} {...linkProps}>
        {element}
      </PageLink>
    );
  } else {
    return (
      <Link className="notion-link" href={externalUrl} {...linkProps}>
        {element}
      </Link>
    );
  }
};
