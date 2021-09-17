import React from "react";
import { WrappedTextPresenter } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";

export const WrappedText: WrappedTextPresenter = ({
  block,
  blockId,
  children,
}) => {
  const { components } = useNotionContext();

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
