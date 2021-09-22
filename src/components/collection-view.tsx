import React from "react";

import { ListView, BoardView, TableView, GalleryView } from "./collections";

import { Collections, API, Components } from "@types";

export type Props = {
  collection: Collections.Collection;
  collectionView: Collections.AnyView;
  collectionData: API.CollectionQueryResult;
};

// Rendered as a child of a Collection "collection.tsx"
export const Component: Components.Presenter<Props> = (props) => {
  const { collectionView } = props;

  switch (collectionView.type) {
    case "table":
      return <TableView {...props} />;

    case "gallery":
      return <GalleryView {...props} />;

    case "list":
      return <ListView {...props} />;

    case "board":
      return <BoardView {...props} />;

    default:
      throw new Error(`Unsupported collection view ${collectionView.type}`);
  }
};
