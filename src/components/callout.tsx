import React from "react";

import { CalloutPresenter } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";

export const Callout: CalloutPresenter = ({ block, blockId, children }) => {
  const { components } = useNotionContext();
  const { properties } = block;

  const style = cs(
    "notion-callout",
    blockId,
    block.format?.block_color && `notion-${block.format?.block_color}_co`
  );

  const title = properties.title;

  return (
    <div className={style}>
      <components.pageIcon block={block} />

      <div className="notion-callout-text">
        <components.text value={title} block={block} />
        {children}
      </div>
    </div>
  );
};
