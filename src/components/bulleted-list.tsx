import React from "react";

import { useNotionContext } from "@context";
import { BulletedListPresenter, BulletedListProps, Presenter } from "@types";
import { cs } from "@utils";

export const BulletedList: BulletedListPresenter = ({
  block,
  blockId,
  children,
}) => {
  const { recordMap } = useNotionContext();
  const { content } = block;
  const { type } = block;

  const parentBlock = recordMap.block[block.parent_id];

  const isTopLevel = type !== parentBlock?.value?.type;
  const hasChildren = content;

  const listStyle = cs("notion-list", "notion-list-disc", blockId);

  const output = hasChildren ? (
    <NestedList block={block} className={listStyle}>
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

interface WrapListProps extends Pick<BulletedListProps, "children"> {
  className: string;
}

const WrapList: Presenter<WrapListProps> = ({ children, className }) => {
  return <ul className={className}>{children}</ul>;
};

interface NestedListProps extends Pick<BulletedListProps, "block"> {
  className: string;
  children?: React.ReactNode;
}

const NestedList: Presenter<NestedListProps> = ({
  block,
  className,
  children,
}) => {
  const { properties } = block;
  return (
    <>
      {properties && <ListItem block={block} />}
      {<WrapList className={className}>{children}</WrapList>}
    </>
  );
};

interface ListItemProps extends Pick<BulletedListProps, "block"> {}

const ListItem: Presenter<ListItemProps> = ({ block }) => {
  const { components } = useNotionContext();
  const { properties } = block;
  const title = properties?.title ?? [[""]];

  return (
    <li>
      <components.text value={title} block={block} />
    </li>
  );
};
