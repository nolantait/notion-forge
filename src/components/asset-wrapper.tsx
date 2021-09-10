import React from "react";
import { BaseContentBlock, Block } from "notion-types";
import { cs } from "../utils";
import { useNotionContext } from "../context";

interface AssetWrapperProps {
  blockId: string;
  block: Block;
}

export const AssetWrapper = (props: AssetWrapperProps) => {
  const { block, blockId } = props;
  const { components } = useNotionContext();
  const value = block as BaseContentBlock;

  return (
    <figure
      className={cs(
        "notion-asset-wrapper",
        `notion-asset-wrapper-${block.type}`,
        value.format?.block_full_width && "notion-asset-wrapper-full",
        blockId
      )}
    >
      <components.asset block={value} />

      {value?.properties?.caption && (
        <figcaption className="notion-asset-caption">
          <components.text value={block.properties.caption} block={block} />
        </figcaption>
      )}
    </figure>
  );
};
