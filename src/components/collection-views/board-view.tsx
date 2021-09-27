import React from "react";

import { Collections, API, Core, Components } from "@types";
import { cs } from "@utils";
import { EmptyIcon } from "@icons";
import { Property } from "@components/property";
import { useNotionContext } from "@context";
import { Decorated } from "@entities";

type BoardGroupValue = {
  type: Core.PropertyType;
  value: string;
};

type BoardGroup = {
  property: Core.PropertyID;
  hidden: boolean;
  value: BoardGroupValue;
};

type BoardGroupHeaderProps = Omit<Props, "collectionView"> & {
  index: number;
  group: BoardGroup;
};

type BoardGroupBodyProps = Props & {
  index: number;
  group: BoardGroup;
};

export type Props = {
  collection: Collections.Collection;
  collectionView: Collections.BoardView;
  collectionData: API.BoardCollectionQueryResult;
};

export const View: Components.Presenter<Props> = ({
  collectionView,
  collectionData,
  collection,
}) => {
  const { format } = collectionView;
  const { board_cover_size: boardCoverSize = "medium" } = format;

  const boardGroups: Array<BoardGroup> =
    format.board_groups2 ?? format.board_columns;

  const containerStyle = cs(
    "notion-board-view",
    `notion-board-view-size-${boardCoverSize}`
  );

  const mapHeaderProps = (
    group: BoardGroup,
    index: number
  ): BoardGroupHeaderProps => {
    return { collection, collectionData, group, index };
  };
  const mapBodyProps = (
    group: BoardGroup,
    index: number
  ): BoardGroupBodyProps => {
    return { collection, collectionData, collectionView, group, index };
  };

  return (
    <article className="notion-board">
      <div className={containerStyle}>
        <header className="notion-board-header">
          <div className="notion-board-header-inner">
            {boardGroups
              .map((group, index) => mapHeaderProps(group, index))
              .map((prop, index) => {
                return <BoardGroupHeader key={index} {...prop} />;
              })}
          </div>
        </header>

        <div className="notion-board-header-placeholder" />

        <section className="notion-board-body">
          {boardGroups
            .map((group, index) => mapBodyProps(group, index))
            .map((prop, index) => {
              return <BoardGroupBody key={index} {...prop} />;
            })}
        </section>
      </div>
    </article>
  );
};

const BoardGroupHeader: Components.Presenter<BoardGroupHeaderProps> = ({
  collectionData,
  collection,
  index,
  group,
}) => {
  if (!collectionData.groupResults || group.hidden) {
    // No groupResults in the data when collection is in a toggle
    return <></>;
  }

  const result = collectionData.groupResults[index];
  const schema = collection.schema[group.property];
  const value = group.value.value ?? "";
  const decoratedValue = new Decorated(value);
  const hasValue = value === "";

  if (!result) throw new Error("Collection data missing for group");
  if (!schema) throw new Error(`Schema missing for ${group.property}`);

  const { total } = result;

  return (
    <div className="notion-board-th" key={index}>
      <div className="notion-board-th-body">
        {hasValue ? (
          <Property
            schema={schema}
            data={decoratedValue}
            collection={collection}
          />
        ) : (
          <span>
            <EmptyIcon className="notion-board-th-empty" />
          </span>
        )}
      </div>

      <span className="notion-board-th-count">{total}</span>
    </div>
  );
};

const BoardGroupBody: Components.Presenter<BoardGroupBodyProps> = ({
  collectionData,
  collection,
  collectionView,
  index,
  group,
}) => {
  const { recordMap, components } = useNotionContext();
  const { format } = collectionView;

  if (!collectionData.groupResults || group.hidden) {
    // No groupResults in the data when collection is in a toggle
    return <></>;
  }

  const result = collectionData.groupResults[index];
  const boardProperties = collectionView.format.board_properties;

  const {
    board_cover: boardCover = { type: "none" },
    board_cover_size: boardCoverSize = "medium",
    board_cover_aspect: boardCoverAspect = "cover",
  } = format;

  return (
    <div className="notion-board-group" key={index}>
      {result.blockIds.map((blockId) => {
        const block = recordMap.block[blockId].value;
        if (!block) throw new Error(`Missing block ${blockId} in recordMap`);

        return (
          <components.collectionCard
            className="notion-board-group-card"
            collection={collection}
            block={block}
            cover={boardCover}
            coverSize={boardCoverSize}
            coverAspect={boardCoverAspect}
            properties={boardProperties}
            key={blockId}
          />
        );
      })}
    </div>
  );
};
