import React from "react";

import { CollectionViewPresenter } from "@types";
import {
  CollectionViewList,
  CollectionViewBoard,
  CollectionViewGallery,
  CollectionViewTable,
} from "@components";

export const CollectionView: CollectionViewPresenter = (props) => {
  const { collectionView } = props;

  switch (collectionView.type) {
    case "table":
      return <CollectionViewTable {...props} />;

    case "gallery":
      return <CollectionViewGallery {...props} />;

    case "list":
      return <CollectionViewList {...props} />;

    case "board":
      return <CollectionViewBoard {...props} />;

    default:
      throw new Error(`Unsupported collection view ${collectionView}`);
  }
};
