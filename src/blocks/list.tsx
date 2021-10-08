import React from "react";

import { useNotionContext } from "@context";
import { Domain, View } from "@types";
import { cs } from "@utils";

type ValidBlocks =
  | Domain.Blocks.BulletedList.Entity
  | Domain.Blocks.NumberedList.Entity;

export type Props = {
  block: ValidBlocks;
  className?: string;
  children?: React.ReactNode;
};

export const List: View.Component<Props> = ({ block, ...rest }) => {
  const { recordMap } = useNotionContext();

  const isTopLevel =
    block.type !==
    recordMap
      .getParentBlock(block)
      .then((block) => block.type)
      .getOrElse(undefined);

  if (isTopLevel) {
    return (
      <ListWrap block={block}>
        <ItemWrap {...rest} block={block} />
      </ListWrap>
    );
  }

  return <ItemWrap {...rest} block={block} />;
};

type ListWrapProps = {
  block: ValidBlocks;
  className?: string;
  children: React.ReactNode;
};
const ListWrap: View.Component<ListWrapProps> = ({
  block,
  children,
  className,
}) => {
  const bulletStyle = cs("notion-list", "notion-list-disc", className);
  const numberStyle = cs("notion-list", "notion-list-numbered", className);

  switch (block.type) {
    case "bulleted_list":
      return <ul className={bulletStyle}>{children}</ul>;
    case "numbered_list":
      return <ol className={numberStyle}>{children}</ol>;
    default: {
      throw new Error(`Could not find list for block type`);
    }
  }
};

type ItemWrapProps = Props;
const ItemWrap: View.Component<ItemWrapProps> = ({
  block,
  className,
  children,
}) => {
  if (block.content.length) {
    return (
      <>
        <Item block={block} />
        <List className={className} block={block}>
          {children}
        </List>
      </>
    );
  }

  return <Item block={block} />;
};

type ItemProps = Pick<Props, "block">;
const Item: View.Component<ItemProps> = ({ block }) => {
  const { components } = useNotionContext();
  const title = block.title.getOrElse(undefined);

  if (!title) return <></>;

  return (
    <li>
      <components.text value={title} block={block} />
    </li>
  );
};
