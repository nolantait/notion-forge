import React from "react";

import { cs } from "@utils";
import { Component as ColumnTitle } from "./column-title";
import { useNotionContext } from "@context";
import { Core, Components } from "@types";
import { Props as ViewProps } from "../blocks/collection-view";
import { Component as Property } from "@components/property";
import { Decorated, PageBlock, TableView, TableProperty } from "@entities";

export type Props = Pick<ViewProps, "collection">;

export const View: Components.Presenter<Props> = ({ collection }) => {
  const view = collection.currentView as TableView;

  const tableProperties = view.properties;
  const blocks = collection.data.blocks.getOrElse([]);

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

const TableCell: Components.Presenter<TableCellProps> = ({
  property,
  collection,
  blockId,
}) => {
  const { recordMap } = useNotionContext();
  const propertyId = property.propertyId;
  const schema = collection.schema[propertyId];
  const block = recordMap.findBlock(blockId).getOrElse(undefined);
  if (!block) throw new Error(`Could not find block for blockID ${blockId}`);
  const page = block as PageBlock;

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

type TableCellProps = Pick<ViewProps, "collection"> & {
  property: TableProperty;
  blockId: Core.ID;
};

type TableHeadProps = Pick<ViewProps, "collection"> & {
  property: TableProperty;
};

const TableHead = ({ collection, property }: TableHeadProps): JSX.Element => {
  const propertyId = property.propertyId;
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
