import React from "react";
import { PageBlock } from "notion-types";
import { cs } from "@utils";

import { CollectionColumnTitle } from "./collection-column-title";
import { Property } from "./property";
import { useNotionContext } from "../context";

interface CollectionRowProps {
  block: PageBlock;
  blockId: string;
}

export const CollectionRow = ({
  block,
  blockId,
}: CollectionRowProps): JSX.Element => {
  const { recordMap } = useNotionContext();
  const collectionId = block.parent_id;
  const collection = recordMap.collection[collectionId]?.value;

  if (!collection) throw new Error(`Missing collection for block ${blockId}`);

  const schemas = collection.schema;

  let propertyIds = Object.keys(schemas).filter((id) => id !== "title");

  // filter properties based on visibility
  if (collection.format?.property_visibility) {
    propertyIds = propertyIds.filter(
      (id) =>
        collection?.format?.property_visibility?.find(
          ({ property }) => property === id
        )?.visibility !== "hide"
    );
  }

  // sort properties
  if (collection.format?.collection_page_properties) {
    // sort properties based on collection page order
    const idToIndex: Record<string, any> =
      collection.format?.collection_page_properties.reduce(
        (acc, p, i) => ({
          ...acc,
          [p.property]: i,
        }),
        {}
      );

    propertyIds.sort((a, b) => idToIndex[a] - idToIndex[b]);
  } else {
    // default to sorting properties alphabetically based on name
    propertyIds.sort((a, b) => schemas[a].name.localeCompare(schemas[b].name));
  }

  const rowStyle = cs(blockId, "notion-collection-row");

  return (
    <div className={rowStyle}>
      <div className="notion-collection-row-body">
        {propertyIds.map((id) => {
          const schema = schemas[id];

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
