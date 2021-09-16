import React from "react";

import { useNotionContext } from "@context";
import { Notion, BulletedListProps } from "@types";
import { cs } from "@utils";

export const BulletedList = (props: BulletedListProps): JSX.Element => {
  const { recordMap } = useNotionContext();
  const { block, blockId, children } = props;
  const { content } = block;
  const { type } = block;

  const parentBlock = recordMap.block[block.parent_id];

  const isTopLevel = type !== parentBlock?.value?.type;
  const hasChildren = content;

  const listStyle = cs("notion-list", "notion-list-disc", blockId);

  const output = hasChildren ? (
    <NestedList block={block} style={listStyle}>
      {children}
    </NestedList>
  ) : (
    <ListItem block={block} />
  );

  return isTopLevel ? (
    <WrapList className={listStyle}>{output}</WrapList>
  ) : (
    output
  );
};

const WrapList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}): JSX.Element => {
  return <ul className={className}>{children}</ul>;
};

const NestedList = ({
  block,
  style,
  children,
}: {
  block: Notion.BulletedListBlock;
  style: string;
  children?: React.ReactNode;
}) => {
  const { properties } = block;
  return (
    <>
      {properties && <ListItem block={block} />}
      {<WrapList className={style} children={children} />}
    </>
  );
};

const ListItem = ({
  block,
}: {
  block: Notion.BulletedListBlock;
}): JSX.Element => {
  const { components } = useNotionContext();
  const { properties } = block;
  const title = properties?.title ?? "";

  return (
    <li>
      <components.text value={title} block={block} />
    </li>
  );
};
