import React from "react";

import { Components, Collections } from "@types";
import { cs, getPagesFromQuery } from "@utils";
import { Component as Card } from "../collection-views/card";
import { Props as ViewProps } from "../blocks/collection-view";

export type Props = Omit<ViewProps, "collectionView"> & {
  collectionView: Collections.GalleryView;
};

export const View: Components.Presenter<Props> = ({
  collection,
  collectionView,
  collectionData,
}) => {
  const {
    gallery_cover = { type: "none" },
    gallery_cover_size = "medium",
    gallery_cover_aspect = "cover",
  } = collectionView.format || {};

  const galleryStyle = cs(
    "notion-gallery-grid",
    `notion-gallery-grid-size-${gallery_cover_size}`
  );

  const blocks = getPagesFromQuery(collectionData);

  return (
    <article className="notion-gallery">
      <div className="notion-gallery-view">
        <div className={galleryStyle}>
          {blocks.map((block): React.ReactElement => {
            if (!block) return <></>;

            return (
              <Card
                collection={collection}
                block={block}
                cover={gallery_cover}
                coverSize={gallery_cover_size}
                coverAspect={gallery_cover_aspect}
                properties={collectionView.format?.gallery_properties}
                key={block.id}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
};
