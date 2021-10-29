import React from "react";

import { cs } from "@utils";
import { useNotionContext } from "@context";
import { View, Domain } from "@types";
import { Component as PropertyComponent } from "@components/property";
import { Decorated, CollectionViewProperty, Property } from "@entities";
import { ColumnTitle } from "../../column-title";

export type Props = {
  view: Domain.Blocks.CollectionView.Table.Entity;
  block: Domain.Blocks.CollectionView.Entity;
};

export const TableComponent: View.Component<Props> = ({ view, block }) => {
  const { recordMap } = useNotionContext();
  const properties = view.properties.getOrElse([]);
  const blocks = recordMap.getViewBlocks(view.id, block.collectionId);

  return (
    <div className="notion-table">
      <div className="notion-table-view">
        {properties.length && (
          <>
            <div className="notion-table-header">
              <div className="notion-table-header-inner">
                {properties.map((property, index) => (
                  <TableHead key={index} {...{ block, property }} />
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

const TableCell: View.Component<TableCellProps> = ({ property, block }) => {
  const { recordMap } = useNotionContext();
  const definition = recordMap
    .getPropertyDefinition(block.collectionId, property.id)
    .getOrElse(undefined);

  if (!definition)
    throw new Error(`Could not find definition for property ${property}`);

  const blockProperty = block
    .getPageProperty(property)
    .getOrElse(Decorated.empty());
  const definedProperty = new Property(definition, blockProperty);

  const style: React.CSSProperties = {
    width: getPropertyWidth(property),
  };

  const containerStyle = cs(
    "notion-table-cell",
    `notion-table-cell-${definedProperty.type}`
  );

  return (
    <div key={property.id} className={containerStyle} style={style}>
      <PropertyComponent property={property} block={block} />
    </div>
  );
};

type TableCellProps = {
  block: Domain.Blocks.Page.Entity;
  property: CollectionViewProperty;
};

type TableHeadProps = Props & { property: CollectionViewProperty };

const TableHead = ({ block, property }: TableHeadProps): JSX.Element => {
  const { recordMap } = useNotionContext();
  const definition = recordMap
    .getPropertyDefinition(block.collectionId, property.id)
    .getOrElse(undefined);

  const style: React.CSSProperties = {
    width: getPropertyWidth(property),
  };

  if (!definition)
    throw new Error(
      `Missing property definition for ${block} with property ${property.id}`
    );

  return (
    <div className="notion-table-th" key={property.id}>
      <div className="notion-table-view-header-cell" style={style}>
        <div className="notion-table-view-header-cell-inner">
          <ColumnTitle definition={definition} />
        </div>
      </div>
    </div>
  );
};

const getPropertyWidth = (property: CollectionViewProperty): number => {
  const isTitle = property.id === "title";
  const width = property.width.getOrElse(undefined);

  if (width) {
    return width;
  } else if (isTitle) {
    return 280;
  } else {
    return 200;
  }
};
