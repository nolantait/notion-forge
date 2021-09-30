import React from "react";

import { Components } from "@types";
import { cs } from "@utils";
import { Component as Card } from "../collection-views/card";
import { Props as ViewProps } from "../blocks/collection-view";
import { GalleryView } from "@entities";

export type Props = Pick<ViewProps, "collection">;

export const GalleryViewComponent: Components.Presenter<Props> = ({
  collection,
}) => {
  const view = collection.currentView as GalleryView;

  const galleryStyle = cs(
    "notion-gallery-grid",
    `notion-gallery-grid-size-${view.coverSize}`
  );

  const blocks = collection.data.blocks.getOrElse([]);

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
