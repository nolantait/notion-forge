import React from "react";

import { useNotionContext } from "../context";
import { BulletedListBlock } from "notion-types";
import { cs } from "../utils";

interface BulletedListProps {
  block: BulletedListBlock;
  blockId: string;
  children?: React.ReactNode;
}

export const BulletedList = (props: BulletedListProps) => {
  const { recordMap } = useNotionContext();
  const { block, blockId, children } = props;
  const { content, properties } = block;

  const isTopLevel =
    block.type !== recordMap.block[block.parent_id]?.value?.type;
  const hasChildren = content;

  const listStyle = cs("notion-list", "notion-list-disc", blockId);

  let output: JSX.Element | null = null;

  if (hasChildren) {
    output = NestedList(block, listStyle, children);
  } else {
    output = properties ? ListItem(block) : null;
  }

  return isTopLevel ? WrapList(output, listStyle) : output;
};

const NestedList = (
  block: BulletedListBlock,
  style: string,
  children?: React.ReactNode
) => {
  const { properties } = block;
  return (
    <>
      {properties && ListItem(block)}
      {WrapList(children, style)}
    </>
  );
};

const WrapList = (content: React.ReactNode, style: string) => {
  return <ul className={style}>{content}</ul>;
};

const ListItem = (block: BulletedListBlock) => {
  const { components } = useNotionContext();
  const { title } = block.properties;

  return (
    <li>
      <components.text value={title} block={block} />
    </li>
  );
};
