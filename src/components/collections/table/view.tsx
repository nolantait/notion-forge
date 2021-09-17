import React from "react";

import { cs } from "@utils";
import { Property, CollectionColumnTitle } from "@components";
import { useNotionContext } from "@context";
import {
  Notion,
  CollectionViewProps,
  CollectionViewPresenter,
  Presenter,
} from "@types";

interface TableProperty {
  property: Notion.PropertyID;
  visible?: boolean;
  width?: number;
}

interface TableCellProps extends Pick<CollectionViewProps, "collection"> {
  property: TableProperty;
  blockId: Notion.ID;
}

interface TableHeadProps extends Pick<CollectionViewProps, "collection"> {
  property: TableProperty;
}

export const CollectionViewTable: CollectionViewPresenter = ({
  collection,
  collectionView,
  collectionData,
}) => {
  const tableProperties: TableProperty[] =
    collectionView.format?.table_properties ?? [];

  const filteredProperties = fetchTableProperties(
    collection.schema,
    tableProperties
  );

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

const TableCell: Presenter<TableCellProps> = ({
  property,
  collection,
  blockId,
}) => {
  const { recordMap } = useNotionContext();
  const propertyId = property.property;
  const schema = collection.schema?.[propertyId];
  const block = recordMap.block[blockId].value;
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
        block={block as Notion.PageBlock}
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

const fetchTableProperties = (
  schema: Notion.CollectionPropertySchemaMap,
  tableProperties: TableProperty[]
): TableProperty[] => {
  if (tableProperties.length > 0) {
    return tableProperties.filter(
      (prop) => prop.visible && schema[prop.property]
    );
  }
  return [{ property: "title" }].concat(
    Object.keys(schema)
      .filter((p) => p !== "title")
      .map((property) => ({ property }))
  );
};
