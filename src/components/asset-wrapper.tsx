import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { AssetWrapperPresenter } from "@types";

export const AssetWrapper: AssetWrapperPresenter = ({ block, blockId }) => {
  const { components } = useNotionContext();
  const { type } = block;
  const isBlockFullWidth = block.format?.block_full_width;
  const caption = block.properties.caption;

  return (
    <figure
      className={cs(
        "notion-asset-wrapper",
        `notion-asset-wrapper-${type}`,
        isBlockFullWidth && "notion-asset-wrapper-full",
        blockId
      )}
    >
      <components.asset block={block} blockId={blockId} />

      {caption && (
        <figcaption className="notion-asset-caption">
          <components.text value={caption} block={block} />
        </figcaption>
      )}
    </figure>
  );
};
