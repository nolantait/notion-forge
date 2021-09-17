import React from "react";

import { useNotionContext } from "@context";
import { TodoPresenter } from "@types";
import { cs } from "@utils";

export const Todo: TodoPresenter = ({ block, blockId, children }) => {
  const { components } = useNotionContext();
  const { properties = { checked: [["No"]] } } = block;
  const isChecked = properties.checked[0][0] === "Yes";
  const containerStyle = cs("notion-to-do", blockId);
  const title = block.properties?.title ?? [[""]];
  const wrapperStyle = cs(
    "notion-to-do-body",
    isChecked && `notion-to-do-checked`
  );

  return (
    <div className={containerStyle}>
      <div className="notion-to-do-item">
        <components.checkbox isChecked={isChecked} blockId={blockId} />

        <div className={wrapperStyle}>
          <components.text value={title} block={block} />
        </div>
      </div>

      <div className="notion-to-do-children">{children}</div>
    </div>
  );
};
