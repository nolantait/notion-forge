import React from "react";
import * as types from "notion-types";
import { cs } from "../utils";
import { useNotionContext } from "../context";

interface WrappedTextProps {
  block: types.TextBlock;
  blockId: string;
  children: React.ReactNode;
}

export const WrappedText = (props: WrappedTextProps) => {
  const { components } = useNotionContext();
  const { block, blockId, children } = props;

  if (!block.properties && !block.content?.length) {
    return <div className={cs("notion-blank", blockId)}>&nbsp;</div>;
  }

  const blockColor = block.format?.block_color;

  return (
    <div
      className={cs(
        "notion-text",
        blockColor && `notion-${blockColor}`,
        blockId
      )}
    >
      {block.properties?.title && (
        <components.text value={block.properties.title} block={block} />
      )}

      {children && <div className="notion-text-children">{children}</div>}
    </div>
  );
};
