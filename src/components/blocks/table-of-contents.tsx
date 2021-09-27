import React from "react";

import { useNotionContext } from "@context";
import { Components } from "@types";
import {
  cs,
  getBlockParentPage,
  getPageTableOfContents,
  TableOfContentsEntry,
  uuidToId,
} from "@utils";
import { TableOfContentsBlock } from "@entities";

export type Props = {
  block: TableOfContentsBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { recordMap } = useNotionContext();
  const page = getBlockParentPage(block._dto, recordMap);

  if (!page) {
    throw new Error(
      `Missing parent block for table of contents block ${block.id}`
    );
  }

  const tableOfContents = getPageTableOfContents(page as any, recordMap);
  const { blockColor } = block;
  const style = cs(
    "notion-table-of-contents",
    className,
    `notion-${blockColor}`
  );

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
  const { id, indentLevel, text } = item;
  const href = `#${uuidToId(id)}`;
  const itemStyle = {
    display: "inline-block",
    marginLeft: indentLevel * 24,
  };

  return (
    <a key={id} href={href} className="notion-table-of-contents-item">
      <span className="notion-table-of-contents-item-body" style={itemStyle}>
        {text}
      </span>
    </a>
  );
};
