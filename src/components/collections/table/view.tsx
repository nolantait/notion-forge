import React from "react";

import { Notion, CollectionViewProps } from "@types";
import { cs } from "@utils";
import { Property, CollectionColumnTitle } from "@components";
import { useNotionContext } from "@context";

interface TableProperty {
  property: Notion.PropertyID;
  visible?: boolean;
  width?: number;
}

interface TableCellProps {
  collection: Notion.Collection;
  property: TableProperty;
  blockId: Notion.ID;
}

interface TableHeadProps {
  collection: Notion.Collection;
  property: TableProperty;
}

export const CollectionViewTable = ({
  collection,
  collectionView,
  collectionData,
}: CollectionViewProps): JSX.Element => {
  const tableProperties: TableProperty[] =
    collectionView.format?.table_properties ?? [];

  const fetchTableProperties = (
    tableProperties: TableProperty[]
  ): TableProperty[] => {
    if (tableProperties.length > 0) {
      return tableProperties.filter(
        (prop) => prop.visible && collection.schema[prop.property]
      );
    }
    return [{ property: "title" }].concat(
      Object.keys(collection.schema)
        .filter((p) => p !== "title")
        .map((property) => ({ property }))
    );
  };

  const filteredProperties = fetchTableProperties(tableProperties);

  return (
    <div className="notion-table">
      <div className="notion-table-view">
        {!!filteredProperties.length && (
          <>
            <div className="notion-table-header">
              <div className="notion-table-header-inner">
                {filteredProperties.map((property: TableProperty) => (
                  <TableHead {...{ collection, property }} />
                ))}
              </div>
            </div>

            <div className="notion-table-header-placeholder"></div>

            <div className="notion-table-body">
              {collectionData.blockIds.map((blockId) => (
                <div className="notion-table-row" key={blockId}>
                  {filteredProperties.map((property) => (
                    <TableCell {...{ property, collection, blockId }} />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TableCell = ({
  property,
  collection,
  blockId,
}: TableCellProps): JSX.Element => {
  const { recordMap } = useNotionContext();
  const propertyId = property.property;
  const schema = collection.schema?.[propertyId];
  const block: Notion.Block = recordMap.block[blockId].value;
  const data = block?.properties?.[propertyId];

  const style: React.CSSProperties = {
    width: getPropertyWidth(property),
  };

  const containerStyle = cs(
    "notion-table-cell",
    `notion-table-cell-${schema.type}`
  );

  return (
    <div key={propertyId} className={containerStyle} style={style}>
      <Property
        schema={schema}
        data={data}
        block={block}
        collection={collection}
      />
    </div>
  );
};

const TableHead = ({ collection, property }: TableHeadProps): JSX.Element => {
  const propertyId = property.property;
  const schema = collection.schema[propertyId];
  const style: React.CSSProperties = {
    width: getPropertyWidth(property),
  };

  return (
    <div className="notion-table-th" key={propertyId}>
      <div className="notion-table-view-header-cell" style={style}>
        <div className="notion-table-view-header-cell-inner">
          <CollectionColumnTitle schema={schema} />
        </div>
      </div>
    </div>
  );
};

const getPropertyWidth = (property: TableProperty): number => {
  const isTitle = property.property === "title";

  if (property.width) {
    return property.width;
  } else if (isTitle) {
    return 280;
  } else {
    return 200;
  }
};
