import React from "react";

import { Core, Components, Collections } from "@types";
import { cs, filterHiddenProperties } from "@utils";
import { useNotionContext } from "@context";
import { PageBlock } from "@entities";

export type Props = {
  block: PageBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { components, recordMap } = useNotionContext();
  const collectionId = block.parentId;
  const collection = recordMap.collection[collectionId]?.value;

  if (!collection) throw new Error(`Missing collection for block ${block.id}`);

  const propertyVisibilities: Collections.Properties.Visibility[] =
    collection.format?.property_visibility ?? [];

  let propertyIds: Core.PropertyID[] = Object.keys(collection.schema).filter(
    (id) => id !== "title"
  );
  propertyIds = filterHiddenProperties(propertyIds, propertyVisibilities);
  propertyIds = sortProperties(propertyIds, collection);

  const rowStyle = cs(className, "notion-collection-row");

  return (
    <div className={rowStyle}>
      <div className="notion-collection-row-body">
        {propertyIds.map((id) => {
          const schema = collection.schema[id];

          return (
            <div className="notion-collection-row-property" key={id}>
              <components.collectionColumnTitle schema={schema} />

              <div className="notion-collection-row-value">
                <components.property
                  schema={schema}
                  data={block.fetchProperty(id)}
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
  propertyIds: Core.PropertyID[],
  collection: Collections.Collection
): Core.PropertyID[] => {
  const schemas = collection.schema;
  const collectionProperties =
    collection.format?.collection_page_properties ?? [];

  if (collectionProperties.length > 0) {
    const idToIndex: Record<string, number> = collectionProperties.reduce(
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
