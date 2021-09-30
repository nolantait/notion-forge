import React from "react";

import { Components } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Entity as CalloutBlock } from "./";

export type Props = {
  block: CalloutBlock;
  className?: string;
  children?: React.ReactNode;
};

export const CalloutComponent: Components.Presenter<Props> = ({
  block,
  className,
  children,
}) => {
  const { components } = useNotionContext();
  const { blockColor, title } = block;

  const style = cs("notion-callout", className, `notion-${blockColor}_co`);

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
