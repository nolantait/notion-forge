import React from "react";

import { Notion, CollectionViewProps } from "@types";
import { Property } from "@components/property";
import { useNotionContext } from "@context";
import { getPagesFromQuery } from "@utils";

interface ListItemProps
  extends Pick<CollectionViewProps, "collection" | "collectionView"> {
  block: Notion.PageBlock;
}

interface ListProperty {
  property: Notion.PropertyID;
  visible: boolean;
}

export const CollectionViewList = ({
  collection,
  collectionView,
  collectionData,
}: CollectionViewProps) => {
  const blocks = getPagesFromQuery(collectionData);

  const mapItemProps = (block: Notion.PageBlock): ListItemProps => {
    return { collection, collectionView, block };
  };

  return (
    <div className="notion-list-collection">
      <div className="notion-list-view">
        <div className="notion-list-body">
          {blocks
            .map((block) => mapItemProps(block))
            .map((prop) => (
              <ListItem {...prop} />
            ))}
        </div>
      </div>
    </div>
  );
};

const ListItem = ({ block, collection, collectionView }: ListItemProps) => {
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
        <Property
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
