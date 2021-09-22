import React from "react";
import { Components } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";
import { TextBlock } from "@entities";

export type Props = {
  block: TextBlock;
  className?: string;
  children?: React.ReactNode;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
  children,
}) => {
  const { components } = useNotionContext();

  if (!block.content.length) {
    return <div className={cs("notion-blank", className)}>&nbsp;</div>;
  }

  const { blockColor, title } = block;

  return (
    <div className={cs("notion-text", `notion-${blockColor}`, className)}>
      {!title.isEmpty && <components.text value={title} block={block} />}

      {children && <div className="notion-text-children">{children}</div>}
    </div>
  );
};
