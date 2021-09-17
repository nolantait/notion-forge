import React from "react";

import { TogglePresenter } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";

export const Toggle: TogglePresenter = ({ block, blockId, children }) => {
  const { components } = useNotionContext();
  const style = cs("notion-toggle", blockId);

  return (
    <details className={style}>
      <summary>
        <span>
          <components.text value={block.properties?.title} block={block} />
        </span>
      </summary>

      <div>{children}</div>
    </details>
  );
};
