import React from "react";

import { ListView, BoardView, TableView, GalleryView } from "./";
import { Collection } from "@entities";
import { Components } from "@types";

export type Props = {
  collection: Collection;
};

// Rendered as a child of a Collection "collection.tsx"
export const ViewComponent: Components.Presenter<Props> = ({ collection }) => {
  const type = collection.currentView.type;

  switch (type) {
    case "table":
      return <TableView collection={collection} />;

    case "gallery":
      return <GalleryView collection={collection} />;

    case "list":
      return <ListView collection={collection} />;

    case "board":
      return <BoardView collection={collection} />;

    default:
      throw new Error(`Unsupported collection view ${type}`);
  }
};
