import React from "react";

import { Components } from "@types";
import { cs } from "@utils";
import { EmptyIcon } from "@icons";
import { PropertyComponent as Property } from "@components";
import { useNotionContext } from "@context";
import { Decorated, Collection, BoardView, BoardGroup } from "@entities";
import { Component as CollectionCard } from "./card";

type BoardGroupHeaderProps = Pick<Props, "collection"> & {
  view: BoardView;
  index: number;
  group: BoardGroup;
};

type BoardGroupBodyProps = Pick<Props, "collection"> & {
  view: BoardView;
  index: number;
  group: BoardGroup;
};

export type Props = {
  collection: Collection;
};

export const View: Components.Presenter<Props> = ({ collection }) => {
  const view = collection.currentView as BoardView;

  const containerStyle = cs(
    "notion-board-view",
    `notion-board-view-size-${view.coverSize}`
  );

  const mapHeaderProps = (
    group: BoardGroup,
    index: number
  ): BoardGroupHeaderProps => {
    return { collection, view, group, index };
  };
  const mapBodyProps = (
    group: BoardGroup,
    index: number
  ): BoardGroupBodyProps => {
    return { collection, view, group, index };
  };

  return (
    <article className="notion-board">
      <div className={containerStyle}>
        <header className="notion-board-header">
          <div className="notion-board-header-inner">
            {view.groups
              .map((group, index) => mapHeaderProps(group, index))
              .map((prop, index) => {
                return <BoardGroupHeader key={index} {...prop} />;
              })}
          </div>
        </header>

        <div className="notion-board-header-placeholder" />

        <section className="notion-board-body">
          {view.groups
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
  collection,
  index,
  group,
}) => {
  if (!collection.hasData || group.hidden) {
    // No groupResults in the data when collection is in a toggle
    return <></>;
  }

  const query = collection.data;
  const value = new Decorated(group.value);

  if (!collection.hasData) throw new Error("Collection data missing for group");

  const total = query.total;

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
  const { recordMap } = useNotionContext();
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
          <CollectionCard
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
