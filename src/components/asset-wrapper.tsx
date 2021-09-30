import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Components } from "@types";
import * as Blocks from "@blocks";

type AssetWhitelist =
  | Blocks.Tweet.Entity
  | Blocks.Maps.Entity
  | Blocks.Pdf.Entity
  | Blocks.Figma.Entity
  | Blocks.Typeform.Entity
  | Blocks.Codepen.Entity
  | Blocks.Excalidraw.Entity
  | Blocks.Image.Entity
  | Blocks.Gist.Entity
  | Blocks.Embed.Entity
  | Blocks.Video.Entity;

export type Props = {
  className?: string;
  block: AssetWhitelist;
  children: React.ReactElement;
};

export const Component: Components.Presenter<Props> = ({
  block,
  children,
  className,
}) => {
  const { components } = useNotionContext();
  const { type, caption } = block;
  const style = cs(
    "notion-asset-wrapper",
    `notion-asset-wrapper-${type}`,
    block.blockFullWidth && "notion-asset-wrapper-full",
    className
  );

  return (
    <figure className={style}>
      {children}

      {caption && (
        <figcaption className="notion-asset-caption">
          <components.text value={caption} block={block} />
        </figcaption>
      )}
    </figure>
  );
};
