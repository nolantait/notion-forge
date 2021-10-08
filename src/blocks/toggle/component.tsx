import React from "react";

import { View } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Decorated } from "@entities";
import { Entity as ToggleBlock } from "./";

export type Props = {
  block: ToggleBlock;
  className?: string;
  children?: React.ReactNode;
};

export const ToggleComponent: View.Component<Props> = ({
  block,
  className,
  children,
}) => {
  const { components } = useNotionContext();
  const style = cs("notion-toggle", className);
  const title = block.title.getOrElse(Decorated.empty());

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
