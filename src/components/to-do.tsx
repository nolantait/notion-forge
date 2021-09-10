import React from "react";
import { useNotionContext } from "../context";
import { TodoBlock } from "notion-types";
import { cs } from "../utils";

interface TodoProps {
  block: TodoBlock;
  blockId: string;
  children?: React.ReactNode;
}

export const Todo = (props: TodoProps) => {
  const { components } = useNotionContext();
  const { block, blockId, children } = props;

  const isChecked = block.properties?.checked?.[0]?.[0] === "Yes";

  const containerStyle = cs("notion-to-do", blockId);
  const wrapperStyle = cs(
    "notion-to-do-body",
    isChecked && `notion-to-do-checked`
  );

  return (
    <div className={containerStyle}>
      <div className="notion-to-do-item">
        <components.checkbox isChecked={isChecked} />

        <div className={wrapperStyle}>
          <components.text value={block.properties?.title} block={block} />
        </div>
      </div>

      <div className="notion-to-do-children">{children}</div>
    </div>
  );
};
