import React from "react";

import { useNotionContext } from "@context";
import { Core, Components } from "@types";
import { parsePageId } from "@utils";

export type Props = {
  decoration: ["a", string];
  linkProps: React.HTMLProps<HTMLAnchorElement>;
  linkProtocol?: Core.LinkProtocol;
  element: React.ReactElement;
};

// ["a", external_or_relative_path]
export const Decorator: Components.Presenter<Props> = ({
  decoration,
  linkProps,
  linkProtocol,
  element,
}) => {
  const { components, mapPageUrl } = useNotionContext();
  const path = decoration[1];
  const pathname = path.substr(1);
  const id = parsePageId(pathname, { uuid: true });
  const isRelativePath = path[0] === "/";
  const externalUrl = linkProtocol
    ? `${linkProtocol}:${decoration[1]}`
    : decoration[1];

  if (isRelativePath && id) {
    return (
      <components.pageLink
        className="notion-link"
        href={mapPageUrl(id)}
        {...linkProps}
      >
        {element}
      </components.pageLink>
    );
  } else {
    return (
      <components.link
        className="notion-link"
        href={externalUrl}
        {...linkProps}
      >
        {element}
      </components.link>
    );
  }
};
