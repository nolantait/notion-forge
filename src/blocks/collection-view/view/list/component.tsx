import React from "react";

import { Property } from "@components/property";
import { useNotionContext } from "@context";
import { Blocks, Core, Collections, Components } from "@types";

export type Props = {
  view: Collections.ListView;
};

export const ListViewComponent: Components.Presenter<Props> = ({ view }) => {
  const blocks = getPagesFromQuery(collectionData);

  const mapItemProps = (block: Blocks.Page): ListItemProps => {
    return { collection, collectionView, block };
  };

  return (
    <div className="notion-list-collection">
      <div className="notion-list-view">
        <div className="notion-list-body">
          {blocks
            .map((block) => mapItemProps(block))
            .map((prop, index) => (
              <ListItem key={index} {...prop} />
            ))}
        </div>
      </div>
    </div>
  );
};

type ListItemProps = Pick<Props, "collection" | "collectionView"> & {
  block: Blocks.Page;
};

type ListProperty = {
  property: Core.PropertyID;
  visible: boolean;
};

const ListItem: Components.Presenter<ListItemProps> = ({
  block,
  collection,
  collectionView,
}) => {
  const properties: Record<string, any> = block.properties ?? {};
  const titleSchema = collection.schema.title;
  const titleData = block?.properties?.title;

  const listProperties: ListProperty[] =
    collectionView.format?.list_properties ?? [];
  const filteredProperties = listProperties.filter((prop) => prop.visible);

  return (
    <PageLink
      className="notion-list-item notion-page-link"
      block={block}
      key={block.id}
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
        {filteredProperties.map((prop): React.ReactElement => {
          const schema = collection.schema[prop.property];
          const data = properties[prop.property];

          if (!schema) {
            return <></>;
          }

          return (
            <div className="notion-list-item-property" key={prop.property}>
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
    </PageLink>
  );
};
