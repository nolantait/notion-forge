import React from "react";

import { Property } from "@components/property";
import { useNotionContext } from "@context";
import { getPagesFromQuery } from "@utils";
import { Blocks, Core, Collections, Components } from "@types";
import { Props as ViewProps } from "../../collection-view";

export type Props = Omit<ViewProps, "collectionView"> & {
  collectionView: Collections.ListView;
};

export const View: Components.Presenter<Props> = ({
  collection,
  collectionView,
  collectionData,
}) => {
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
  const { components, mapPageUrl } = useNotionContext();
  const properties: Record<string, any> = block.properties ?? {};
  const titleSchema = collection.schema.title;
  const titleData = block?.properties?.title;

  const listProperties: ListProperty[] =
    collectionView.format?.list_properties ?? [];
  const filteredProperties = listProperties.filter((prop) => prop.visible);

  return (
    <components.pageLink
      className="notion-list-item notion-page-link"
      href={mapPageUrl(block.id)}
      key={block.id}
    >
      <div className="notion-list-item-title">
        <components.property
          schema={titleSchema}
          data={titleData}
          block={block}
          collection={collection}
        />
      </div>

      <div className="notion-list-item-body">
        {filteredProperties.map((prop): JSX.Element => {
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
    </components.pageLink>
  );
};
