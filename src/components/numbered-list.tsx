import React from "react";
import { useNotionContext } from "../context";
import { NumberedListBlock } from "notion-types";
import { cs, getListNumber } from "../utils";

interface NumberedListProps {
  block: NumberedListBlock;
  blockId: string;
  children?: React.ReactNode;
}

export const NumberedList = (props: NumberedListProps) => {
  const { recordMap } = useNotionContext();
  const { block, blockId, children } = props;
  const { content, properties } = block;

  const isTopLevel =
    block.type !== recordMap.block[block.parent_id]?.value?.type;
  const hasChildren = content;

  const startingIndex = getListNumber(block.id, recordMap.block);
  const listStyle = cs("notion-list", "notion-list-numbered", blockId);

  let output: JSX.Element | null = null;

  if (hasChildren) {
    output = NestedList(block, listStyle, startingIndex, children);
  } else {
    output = properties ? ListItem(block) : null;
  }

  return isTopLevel ? WrapList(output, listStyle, startingIndex) : output;
};

const NestedList = (
  block: NumberedListBlock,
  style: string,
  startingIndex?: number,
  children?: React.ReactNode
) => {
  const { properties } = block;
  return (
    <>
      {properties && ListItem(block)}
      {WrapList(children, style, startingIndex)}
    </>
  );
};

const WrapList = (
  content: React.ReactNode,
  style: string,
  startingIndex?: number
) => {
  return (
    <ol start={startingIndex} className={style}>
      {content}
    </ol>
  );
};

const ListItem = (block: NumberedListBlock) => {
  const { components } = useNotionContext();
  const { title } = block.properties;

  return (
    <li>
      <components.text value={title} block={block} />
    </li>
  );
};
