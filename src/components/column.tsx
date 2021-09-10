import React from "react";
import { cs } from "../utils";
import { useNotionContext } from "../context";
import { ColumnBlock } from "notion-types";

interface ColumnProps {
  block: ColumnBlock;
  blockId: string;
  children?: React.ReactNode;
}

export const Column = (props: ColumnProps) => {
  const { recordMap } = useNotionContext();
  const { block, blockId, children } = props;
  // note: notion uses 46px
  const spacerWidth = `min(32px, 4vw)`;
  const ratio = block.format?.column_ratio || 0.5;
  const parent = recordMap.block[block.parent_id]?.value;
  const columns =
    parent?.content?.length || Math.max(2, Math.ceil(1.0 / ratio));

  const width = `calc((100% - (${columns - 1} * ${spacerWidth})) * ${ratio})`;
  const inlineStyle = { width };
  const style = cs("notion-column", blockId);

  return (
    <>
      <div className={style} style={inlineStyle}>
        {children}
      </div>

      <div className="notion-spacer" />
    </>
  );
};
