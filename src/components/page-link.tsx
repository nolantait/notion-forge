import React from "react";

import { Domain, View } from "@types";
import { useNotionContext } from "@context";

export type Props = {
  blockId: Domain.ID;
  href: string;
} & Partial<React.HTMLProps<HTMLAnchorElement>>;

export const Component: View.Component<Props> = ({
  href,
  blockId,
  ...rest
}) => {
  const { recordMap } = useNotionContext();
  const signedUrl = recordMap.getSignedUrl(blockId).getOrElse(undefined);
  const finalHref = href ? href : signedUrl ? signedUrl.href : "#";

  return <a {...rest} {...{ href: finalHref }} />;
};
