import React from "react";
import { PageBlock, PropertyID } from "notion-types";

import { CollectionViewProps } from "../types";
import { Property } from "./property";
import { useNotionContext } from "../context";

interface ListProperty {
  property: PropertyID;
  visible: boolean;
}

export const CollectionViewList: React.FC<CollectionViewProps> = ({
  collection,
  collectionView,
  collectionData,
}) => {
  const { components, recordMap, mapPageUrl } = useNotionContext();
  return (
    <div className="notion-list-collection">
      <div className="notion-list-view">
        <div className="notion-list-body">
          {collectionData.blockIds.map((blockId) => {
            const block = recordMap.block[blockId]?.value as PageBlock;
            if (!block) return null;

            const properties = block.properties ?? { title: [] };

            const titleSchema = collection.schema.title;
            const titleData = block?.properties?.title;

            return (
              <components.pageLink
                className="notion-list-item notion-page-link"
                href={mapPageUrl(block.id)}
                key={blockId}
              >
                <div className="notion-list-item-title">
                  <Property
                    schema={titleSchema}
                    data={titleData}
                    block={block}
                    collection={collection}
                  />
                </div>

                <div className="notion-list-item-body">
                  {collectionView.format?.list_properties
                    ?.filter((p: ListProperty) => p.visible)
                    .map((p: ListProperty) => {
                      const schema = collection.schema[p.property];
                      const data =
                        properties && (properties as any)[p.property];

                      if (!schema) {
                        return null;
                      }

                      return (
                        <div
                          className="notion-list-item-property"
                          key={p.property}
                        >
                          <Property
                            schema={schema}
                            data={data}
                            block={block}
                            collection={collection}
                          />
                        </div>
                      );
                    })}
                </div>
              </components.pageLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};
