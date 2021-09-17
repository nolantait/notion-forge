import React from "react";
import { useNotionContext } from "@context";
import { NumberedListPresenter, NumberedListProps } from "@types";
import { cs, getListNumber } from "@utils";

interface NestedListProps
  extends Pick<NumberedListProps, "block" | "children"> {
  startingIndex?: number;
  className?: string;
}
interface ListContainerProps
  extends Pick<NestedListProps, "startingIndex" | "className" | "children"> {}

interface ListItemProps extends Pick<NumberedListProps, "block"> {}

export const NumberedList: NumberedListPresenter = ({
  block,
  blockId,
  children,
}) => {
  const { recordMap } = useNotionContext();
  const { content, properties } = block;
  const parentBlockType = recordMap.block[block.parent_id]?.value?.type;
  const isTopLevel = block.type !== parentBlockType;
  const hasChildren = content;
  const startingIndex = getListNumber(block.id, recordMap.block);
  const listStyle = cs("notion-list", "notion-list-numbered", blockId);

  let output = <></>;

  if (hasChildren) {
    output = (
      <NestedList {...{ block, startingIndex, className: listStyle }}>
        {children}
      </NestedList>
    );
  } else {
    output = properties ? <ListItem block={block} /> : output;
  }

  return isTopLevel ? (
    <ListContainer {...{ className: listStyle, startingIndex }}>
      {output}
    </ListContainer>
  ) : (
    output
  );
};

const NestedList = ({
  block,
  className,
  startingIndex = 1,
  children,
}: NestedListProps): React.ReactElement => {
  const { properties } = block;
  return (
    <>
      {properties && <ListItem block={block} />}
      <ListContainer {...{ className, startingIndex }}>
        {children}
      </ListContainer>
    </>
  );
};

const ListItem = ({ block }: ListItemProps): React.ReactElement => {
  const { components } = useNotionContext();
  const { title } = block.properties ?? { title: [[""]] };

  return (
    <li>
      <components.text value={title} block={block} />
    </li>
  );
};

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
