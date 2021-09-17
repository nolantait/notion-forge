import React from "react";

import { useNotionContext } from "@context";
import { TableOfContentsPresenter } from "@types";
import {
  cs,
  getBlockParentPage,
  getPageTableOfContents,
  TableOfContentsEntry,
  uuidToId,
} from "@utils";

interface TableOfContentsItemProps {
  item: TableOfContentsEntry;
}

export const TableOfContents: TableOfContentsPresenter = ({
  block,
  blockId,
}) => {
  const { recordMap } = useNotionContext();
  const page = getBlockParentPage(block, recordMap);

  if (!page) {
    throw new Error(
      `Missing parent block for table of contents block ${block.id}`
    );
  }

  const tableOfContents = getPageTableOfContents(page, recordMap);
  const blockColor = block.format?.block_color;
  const style = cs(
    "notion-table-of-contents",
    blockId,
    blockColor && `notion-${blockColor}`
  );

  return (
    <div className={style}>
      {tableOfContents.map((item) => (
        <TableOfContentsItem item={item} />
      ))}
    </div>
  );
};

const TableOfContentsItem = ({
  item,
}: TableOfContentsItemProps): React.ReactElement => {
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
