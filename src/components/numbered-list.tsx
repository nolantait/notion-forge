import React from "react";

import { useNotionContext } from "@context";
import { Components } from "@types";
import { cs, getListNumber } from "@utils";
import { NumberedListBlock } from "@entities";

export type Props = {
  block: NumberedListBlock;
  className?: string;
  children?: React.ReactNode;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
  children,
}) => {
  const { recordMap } = useNotionContext();
  const { content, parentId, type } = block;
  const parentBlockType = recordMap.block[parentId]?.value?.type;
  const isTopLevel = type !== parentBlockType;
  const hasChildren = content.length > 0;
  const startingIndex = getListNumber(block.id, recordMap.block);
  const listStyle = cs("notion-list", "notion-list-numbered", className);

  let output = <></>;

  if (hasChildren) {
    output = (
      <NestedList {...{ block, startingIndex, className: listStyle }}>
        {children}
      </NestedList>
    );
  } else {
    output = block.title.isEmpty ? output : <ListItem block={block} />;
  }

  return isTopLevel ? (
    <ListContainer {...{ className: listStyle, startingIndex }}>
      {output}
    </ListContainer>
  ) : (
    output
  );
};

interface NestedListProps extends Pick<Props, "block" | "children"> {
  startingIndex?: number;
  className?: string;
}

const NestedList = ({
  block,
  className,
  startingIndex = 1,
  children,
}: NestedListProps): React.ReactElement => {
  return (
    <>
      {!block.title.isEmpty && <ListItem block={block} />}
      <ListContainer {...{ className, startingIndex }}>
        {children}
      </ListContainer>
    </>
  );
};

type ListItemProps = Pick<Props, "block">;

const ListItem = ({ block }: ListItemProps): React.ReactElement => {
  const { components } = useNotionContext();
  const { title } = block;

  return (
    <li>
      <components.text value={title} block={block} />
    </li>
  );
};

type ListContainerProps = Pick<
  NestedListProps,
  "startingIndex" | "className" | "children"
>;

const ListContainer = ({
  children,
  className,
  startingIndex = 1,
}: ListContainerProps): React.ReactElement => {
  return (
    <ol start={startingIndex} className={className}>
      {children}
    </ol>
  );
};
