import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { Components } from "@types";
import { ColumnBlock } from "@entities";

export type Props = {
  block: ColumnBlock;
  className?: string;
  children?: string;
};

export const ColumnComponent: Components.Presenter<Props> = ({
  block,
  className,
  children,
}) => {
  const { recordMap } = useNotionContext();
  // note: notion uses 46px
  const spacerWidth = `min(32px, 4vw)`;
  const ratio = block.columnRatio;
  const parent = recordMap.block[block.parentId]?.value;
  const columns =
    parent?.content?.length || Math.max(2, Math.ceil(1.0 / ratio));

  const width = `calc((100% - (${columns - 1} * ${spacerWidth})) * ${ratio})`;
  const inlineStyle = { width };
  const style = cs("notion-column", className);

  return (
    <>
      <div className={style} style={inlineStyle}>
        {children}
      </div>

      <div className="notion-spacer" />
    </>
  );
};
