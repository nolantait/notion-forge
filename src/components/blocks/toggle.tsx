import React from "react";

import { Components } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";
import { ToggleBlock } from "@entities";

export type Props = {
  block: ToggleBlock;
  className?: string;
  children?: React.ReactNode;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
  children,
}) => {
  const { components } = useNotionContext();
  const style = cs("notion-toggle", className);
  const { title } = block;

  return (
    <details className={style}>
      <summary>
        <span>
          <components.text value={title} block={block} />
        </span>
      </summary>

      <div>{children}</div>
    </details>
  );
};