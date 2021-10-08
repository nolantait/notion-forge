import React from "react";

import { useNotionContext } from "@context";
import { View } from "@types";
import { cs } from "@utils";
import { Entity as TableOfContentsBlock } from "./";
import { TableOfContentsEntry } from "@entities";

export type Props = {
  block: TableOfContentsBlock;
  className?: string;
};

export const TableOfContentsComponent: View.Component<Props> = ({
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
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

type ItemProps = {
  item: TableOfContentsEntry;
};

const Item: View.Component<ItemProps> = ({ item }) => {
  const { uuid, id, level, text } = item;
  const href = `#${uuid}`;
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
