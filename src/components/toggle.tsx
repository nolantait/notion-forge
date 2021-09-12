import React from "react";
import { ToggleBlock } from "notion-types";
import { cs } from "../utils";
import { useNotionContext } from "../context";

interface ToggleProps {
  blockId: string;
  block: ToggleBlock;
  children?: React.ReactNode;
}

export const Toggle = (props: ToggleProps) => {
  const { block, blockId, children } = props;
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
