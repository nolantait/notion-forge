import React from "react";

import { useNotionContext } from "@context";
import { Components } from "@types";
import { cs, uuidToId } from "@utils";
import { TableOfContentsEntry, TableOfContentsBlock } from "@entities";

export type Props = {
  block: TableOfContentsBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { recordMap } = useNotionContext();
  const { blockColor } = block;

  const style = cs(
    "notion-table-of-contents",
    className,
    `notion-${blockColor}`
  );

  const tableOfContents = recordMap.getTableOfContentsEntries();

  return (
    <div className={style}>
      {tableOfContents.map((item, index) => (
        <TableOfContentsItem key={index} item={item} />
      ))}
    </div>
  );
};

type TableOfContentsItemProps = {
  item: TableOfContentsEntry;
};

const TableOfContentsItem: Components.Presenter<TableOfContentsItemProps> = ({
  item,
}) => {
  const { id, level, text } = item;
  const href = `#${uuidToId(id)}`;
  const itemStyle = {
    display: "inline-block",
    marginLeft: level * 24,
  };

  return (
    <a key={id} href={href} className="notion-table-of-contents-item">
      <span className="notion-table-of-contents-item-body" style={itemStyle}>
        {text}
      </span>
    </a>
  );
};
