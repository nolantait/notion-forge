import React from "react";

import { View } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Entity as CalloutBlock } from "./";
import { PageIcon } from "@components";
import { Decorated } from "@entities";

export type Props = {
  block: CalloutBlock;
  className?: string;
  children?: React.ReactNode;
};

export const CalloutComponent: View.Component<Props> = ({
  block,
  className,
  children,
}) => {
  const { components } = useNotionContext();

  const title = block.title.getOrElse(Decorated.empty());
  const color = block.blockColor.getOrElse("transparent");

  const style = cs("notion-callout", className, `notion-${color}_co`);

  return (
    <div className={style}>
      <PageIcon block={block} />

      <div className="notion-callout-text">
        <components.text value={title} block={block} />
        {children}
      </div>
    </div>
  );
};
