import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { AnyAsset } from "@entities";

export type Props = {
  className?: string;
  block: AnyAsset;
};

export const Component: Components.Presenter<Props> = ({
  block,
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
      <components.asset block={block} className={className} />

      {caption && (
        <figcaption className="notion-asset-caption">
          <components.text value={caption} block={block} />
        </figcaption>
      )}
    </figure>
  );
};
