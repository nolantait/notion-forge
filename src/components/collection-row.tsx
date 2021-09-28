import React from "react";

import { Components } from "@types";
import { cs } from "@utils";
import { useNotionContext } from "@context";
import { PageBlock, Collection } from "@entities";
import { Component as ColumnTitle } from "@components/collection-views/column-title";
import { Component as Property } from "@components/property";
import { Decorated } from "@entities";

export type Props = {
  block: PageBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { recordMap } = useNotionContext();
  const record = recordMap.getParentBlock(block).getOrElse(undefined);

  if (!record) throw new Error(`Missing collection for block ${block.id}`);

  const collection = record as Collection;

  const rowStyle = cs(className, "notion-collection-row");

  return (
    <div className={rowStyle}>
      <div className="notion-collection-row-body">
        {collection.properties.map((property) => {
          const schema = collection.schema[property.property];
          const data = block
            .getPageProperty(property)
            .getOrElse(new Decorated());

          return (
            <div
              className="notion-collection-row-property"
              key={property.property}
            >
              <ColumnTitle schema={schema} />

              <div className="notion-collection-row-value">
                <Property
                  schema={schema}
                  data={data}
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
