import React from "react";

import { Domain, View } from "@types";
import { cs } from "@utils";
import { Component as Card } from "../../card";
import { useNotionContext } from "@context";

export type Props = {
  view: Domain.Blocks.CollectionView.Gallery.Entity;
  block: Domain.Blocks.CollectionView.Entity;
};

export const GalleryViewComponent: View.Component<Props> = ({
  view,
  block,
}) => {
  const { recordMap } = useNotionContext();

  const galleryStyle = cs(
    "notion-gallery-grid",
    `notion-gallery-grid-size-${view.coverSize}`
  );

  const blocks = recordMap
    .getViewBlocks(view.id, block.collectionId)
    .getOrElse([]);

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
                cover={view.cover}
                coverSize={view.coverSize}
                coverAspect={view.coverAspect}
                properties={view.properties}
                key={block.id}
              />
            );
          })}
        </div>
      </div>
    </article>
  );
};
