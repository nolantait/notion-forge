import React from "react";

import { Components, Collections } from "@types";
import { cs, getPagesFromQuery } from "@utils";
import { useNotionContext } from "@context";
import { Props as ViewProps } from "../../collection-view";

export type Props = Omit<ViewProps, "collectionView"> & {
  collectionView: Collections.GalleryView;
};

export const View: Components.Presenter<Props> = ({
  collection,
  collectionView,
  collectionData,
}) => {
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
          {blocks.map((block): JSX.Element => {
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
