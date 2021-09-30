import React from "react";

import * as Blocks from "@blocks";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { Decorated } from "@entities";

export type Props = {
  block: Blocks.Any;
  src?: string;
  title?: string;
  style?: React.CSSProperties;
};

export const Component: Components.Presenter<Props> = ({
  block,
  style,
  src,
  title,
}) => {
  const { recordMap } = useNotionContext();
  const signedUrl = src
    ? { href: src }
    : recordMap.getSignedUrl(block.id).getOrElse(undefined);

  if (!signedUrl) throw new Error(`Could not get signed url for ${block.id}`);

  const frameTitle =
    title ?? block.title.getOrElse(Decorated.fromString("")).asString;

  return (
    <iframe
      className="notion-asset-object-fit"
      style={style}
      src={signedUrl.href}
      title={frameTitle}
      frameBorder="0"
      allowFullScreen
      loading="lazy"
    />
  );
};
