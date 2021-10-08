import React from "react";

import { List, Board, Table, Gallery } from "./";
import { useNotionContext } from "@context";
import { View, Domain } from "@types";

export type Props = {
  block:
    | Domain.Blocks.CollectionView.Entity
    | Domain.Blocks.CollectionViewPage.Entity;
  currentViewId: Domain.ID;
};

// Rendered as a child of a Collection "collection.tsx"
export const ViewComponent: View.Component<Props> = ({
  block,
  currentViewId,
}) => {
  const { recordMap } = useNotionContext();
  const view = recordMap.findView(currentViewId).getOrElse(undefined);

  if (!view) throw new Error(`Missing view for block ${block}`);

  switch (view.type) {
    case "table":
      return <Table.Component view={view} block={block} />;
    case "gallery":
      return <Gallery.Component view={view} block={block} />;
    case "list":
      return <List.Component view={view} block={block} />;
    case "board":
      return <Board.Component view={view} block={block} />;
    case "calendar":
      return <></>;
    default:
      throw new Error(`Unsupported collection view ${(view as any).type}`);
  }
};
