import React from "react";

import { Notion, CollectionRowProps, PropertyVisibility } from "@types";
import { cs, filterHiddenProperties } from "@utils";
import { Property, CollectionColumnTitle } from "@components";
import { useNotionContext } from "@context";

export const CollectionRow = ({
  block,
  blockId,
}: CollectionRowProps): JSX.Element => {
  const { recordMap } = useNotionContext();
  const collectionId = block.parent_id;
  const collection = recordMap.collection[collectionId]?.value;

  if (!collection) throw new Error(`Missing collection for block ${blockId}`);

  const propertyVisibilities: PropertyVisibility[] =
    collection.format?.property_visibility ?? [];

  let propertyIds: Notion.PropertyID[] = Object.keys(collection.schema).filter(
    (id) => id !== "title"
  );
  propertyIds = filterHiddenProperties(propertyIds, propertyVisibilities);
  propertyIds = sortProperties(propertyIds, collection);

  const rowStyle = cs(blockId, "notion-collection-row");

  return (
    <div className={rowStyle}>
      <div className="notion-collection-row-body">
        {propertyIds.map((id) => {
          const schema = collection.schema[id];

          return (
            <div className="notion-collection-row-property" key={id}>
              <CollectionColumnTitle schema={schema} />

              <div className="notion-collection-row-value">
                <Property
                  schema={schema}
                  data={(block.properties as any)?.[id]}
                  block={block}
                  collection={collection}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const sortProperties = (
  propertyIds: Notion.PropertyID[],
  collection: Notion.Collection
): Notion.PropertyID[] => {
  const schemas = collection.schema;
  const collectionProperties =
    collection.format?.collection_page_properties ?? [];

  if (collectionProperties.length > 0) {
    const idToIndex: Record<string, any> = collectionProperties.reduce(
      (ids, property, index) => ({
        ...ids,
        [property.property]: index,
      }),
      {}
    );

    propertyIds.sort((a, b) => idToIndex[a] - idToIndex[b]);
  }

  return propertyIds.sort((a, b) =>
    schemas[a].name.localeCompare(schemas[b].name)
  );
};
