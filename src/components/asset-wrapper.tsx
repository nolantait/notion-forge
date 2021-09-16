import React from "react";
import { cs } from "@utils";
import { useNotionContext } from "@context";
import { AssetWrapperProps } from "@types";

export const AssetWrapper = (props: AssetWrapperProps): JSX.Element => {
  const { components } = useNotionContext();
  const { block, blockId } = props;
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
      <components.asset block={block} />

      {caption && (
        <figcaption className="notion-asset-caption">
          <components.text value={caption} block={block} />
        </figcaption>
      )}
    </figure>
  );
};
