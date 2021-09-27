import React from "react";

import { useNotionContext } from "@context";
import { Components } from "@types";
import { cs } from "@utils";
import { BulletedListBlock } from "@entities";

export type Props = {
  block: BulletedListBlock;
  className?: string;
  children?: React.ReactNode;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
  children,
}) => {
  const { recordMap } = useNotionContext();
  const { content } = block;
  const { type } = block;

  const parentBlock = recordMap.block[block.parentId];

  const isTopLevel = type !== parentBlock?.value?.type;
  const hasChildren = content;

  const listStyle = cs("notion-list", "notion-list-disc", className);

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

interface WrapListProps extends Pick<Props, "children"> {
  className: string;
}
const WrapList: Components.Presenter<WrapListProps> = ({
  children,
  className,
}) => {
  return <ul className={className}>{children}</ul>;
};

interface NestedListProps extends Pick<Props, "block"> {
  className: string;
  children?: React.ReactNode;
}
const NestedList: Components.Presenter<NestedListProps> = ({
  block,
  className,
  children,
}) => {
  const { title } = block;
  return (
    <>
      {!title.isEmpty && <ListItem block={block} />}
      {<WrapList className={className}>{children}</WrapList>}
    </>
  );
};

type ListItemProps = Pick<Props, "block">;
const ListItem: Components.Presenter<ListItemProps> = ({ block }) => {
  const { components } = useNotionContext();
  const { title } = block;

  return (
    <li>
      <components.text value={title} block={block} />
    </li>
  );
};
