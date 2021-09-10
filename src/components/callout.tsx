import React from "react";

import { CalloutBlock } from "notion-types";
import { cs } from "../utils";
import { useNotionContext } from "../context";

interface CalloutProps {
  blockId: string;
  block: CalloutBlock;
  children?: React.ReactNode;
}

export const Callout = (props: CalloutProps) => {
  const { block, blockId, children } = props;
  const { components } = useNotionContext();

  const style = cs(
    "notion-callout",
    blockId,
    block.format?.block_color && `notion-${block.format?.block_color}_co`
  );

  return (
    <div className={style}>
      <components.pageIcon block={block} />

      <div className="notion-callout-text">
        <components.text value={block.properties?.title} block={block} />
        {children}
      </div>
    </div>
  );
};
