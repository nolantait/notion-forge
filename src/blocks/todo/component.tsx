import React from "react";

import { useNotionContext } from "@context";
import { View } from "@types";
import { cs } from "@utils";
import { Entity as TodoBlock } from "./";
import { Checkbox } from "@components";
import { Decorated } from "@entities";

export type Props = {
  block: TodoBlock;
  className?: string;
  children?: React.ReactNode;
};

export const TodoComponent: View.Component<Props> = ({
  block,
  className,
  children,
}) => {
  const { components } = useNotionContext();
  const title = block.title.getOrElse(Decorated.empty());
  const isChecked = block.checked;

  const containerStyle = cs("notion-to-do", className);
  const wrapperStyle = cs(
    "notion-to-do-body",
    isChecked && `notion-to-do-checked`
  );

  return (
    <div className={containerStyle}>
      <div className="notion-to-do-item">
        <Checkbox isChecked={isChecked} className={className} />

        <div className={wrapperStyle}>
          <components.text value={title} block={block} />
        </div>
      </div>

      <div className="notion-to-do-children">{children}</div>
    </div>
  );
};
