import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { View, Domain } from "@types";
import { Component as Property } from "@components/property";
import { Decorated, CollectionViewProperty, Collection } from "@entities";

export type Props = {
  view: Domain.Blocks.CollectionView.Table.Entity;
  block: Domain.Blocks.CollectionView.Entity;
};

export const TableComponent: View.Component<Props> = ({ view, block }) => {
  const { recordMap } = useNotionContext();
  const tableProperties = view.properties.getOrElse([]);
  const blocks = recordMap.getViewBlocks(view.id, block.collectionId);

  return (
    <div className="notion-table">
      <div className="notion-table-view">
        {tableProperties.length && (
          <>
            <div className="notion-table-header">
              <div className="notion-table-header-inner">
                {tableProperties.map((property, index) => (
                  <TableHead key={index} {...{ collection, property }} />
                ))}
              </div>
            </div>

            <div className="notion-table-header-placeholder"></div>

            <div className="notion-table-body">
              {blocks.map((block) => (
                <div className="notion-table-row" key={block.id}>
                  {tableProperties.map((property, index) => (
                    <TableCell
                      key={index}
                      {...{ property, collection, blockId: block.id }}
                    />
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

const TableCell: View.Component<TableCellProps> = ({
  property,
  collection,
  blockId,
}) => {
  const { recordMap } = useNotionContext();
  const propertyId = property.propertyId;
  const schema = collection.schema[propertyId];
  const block = recordMap.findBlock(blockId).getOrElse(undefined);
  if (!block) throw new Error(`Could not find block for blockID ${blockId}`);
  const page = block as Domain.Blocks.Page.Entity;

  const data = page.getPageProperty(property).getOrElse(new Decorated());

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
        block={page}
        collection={collection}
      />
    </div>
  );
};

type TableCellProps = Props & {
  collection: Collection;
  property: CollectionViewProperty;
  blockId: Domain.Blocks.ID;
};

type TableHeadProps = Props & {
  collection: Collection;
  property: CollectionViewProperty;
};

const TableHead = ({ collection, property }: TableHeadProps): JSX.Element => {
  const propertyId = property.id;
  const schema = collection.schema[propertyId];
  const style: React.CSSProperties = {
    width: getPropertyWidth(property),
  };

  return (
    <div className="notion-table-th" key={propertyId}>
      <div className="notion-table-view-header-cell" style={style}>
        <div className="notion-table-view-header-cell-inner">
          <ColumnTitle schema={schema} />
        </div>
      </div>
    </div>
  );
};

const getPropertyWidth = (property: TableProperty): number => {
  const isTitle = property.propertyId === "title";

  if (property.width) {
    return property.width;
  } else if (isTitle) {
    return 280;
  } else {
    return 200;
  }
};
