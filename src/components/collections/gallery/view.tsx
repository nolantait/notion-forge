import React from "react";

import { Notion, CollectionViewProps } from "@types";
import { cs, getPagesFromQuery } from "@utils";
import { useNotionContext } from "@context";

export const CollectionViewGallery = ({
  collection,
  collectionView,
  collectionData,
}: CollectionViewProps): JSX.Element => {
  const { components } = useNotionContext();
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
          {blocks.map((block: Notion.PageBlock): JSX.Element => {
            if (!block) return <></>;

            return (
              <components.collectionCard
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
