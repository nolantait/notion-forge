import React from "react";

import { useNotionContext } from "@context";
import { Components } from "@types";
import { cs } from "@utils";
import { TodoBlock } from "@entities";

export type Props = {
  block: TodoBlock;
  className?: string;
  children?: React.ReactNode;
};

export const TodoComponent: Components.Presenter<Props> = ({
  block,
  className,
  children,
}) => {
  const { components } = useNotionContext();
  const { checked: isChecked, title } = block;
  const containerStyle = cs("notion-to-do", className);
  const wrapperStyle = cs(
    "notion-to-do-body",
    isChecked && `notion-to-do-checked`
  );

  return (
    <div className={containerStyle}>
      <div className="notion-to-do-item">
        <components.checkbox isChecked={isChecked} className={className} />

        <div className={wrapperStyle}>
          <components.text value={title} block={block} />
        </div>
      </div>

      <div className="notion-to-do-children">{children}</div>
    </div>
  );
};
