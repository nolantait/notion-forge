import React from "react";

import { Collections, Formats, Components, Collections } from "@components";
import { PageBlock } from "@entities";
import { useNotionContext, dummyLink, NotionContextProvider } from "@context";
import { CardCover } from "./card/cover";
import { cs } from "@utils";

export type Props = {
  collection: Collections.Collection;
  block: PageBlock;
  cover: Collections.Card.Cover;
  coverSize: Collections.Card.CoverSize;
  coverAspect: Collections.Card.CoverAspect;
  children?: React.ReactNode;
  properties?: Collections.Properties.Visible & Collections.Properties.Identity;
  rest?: any[];
};

export const Component: Components.Presenter<Props> = (props) => {
  const context = useNotionContext();
  const { components, mapPageUrl } = context;

  const {
    collection,
    block,
    cover,
    coverSize,
    coverAspect,
    properties = [],
    className,
    ...rest
  } = props;

  const format = block.format ?? {
    page_cover: undefined,
    page_cover_position: 0.5,
  };

  const { page_cover: coverUrl, page_cover_position = 0.5 } = format;
  const coverPosition = (1 - page_cover_position) * 100;

  const coverProps = {
    block,
    cover,
    coverAspect,
    coverUrl,
    coverSize,
    coverPosition,
    collection,
  };
  const coverContent = <CardCover {...coverProps} />;

  const stubbedComponents = {
    ...context.components,
    // Disable <a> tabs in all child components so we don't create invalid DOM
    // trees with stacked <a> tags.
    link: dummyLink,
    pageLink: dummyLink,
  };

  const linkStyle = cs(
    "notion-collection-card",
    `notion-collection-card-size-${coverSize}`,
    className
  );

  const pageLink = mapPageUrl(block.id);

  const shouldRenderContent = coverContent || cover?.type !== "none";
  const titleSchema = collection.schema.title;
  const titleValue = block?.properties?.title;

  const renderableProperties = getRenderableProperties(collection, properties);

  return (
    <NotionContextProvider {...context} components={stubbedComponents}>
      <components.pageLink className={linkStyle} href={pageLink} {...rest}>
        {shouldRenderContent && (
          <div className="notion-collection-card-cover">{coverContent}</div>
        )}

        <div className="notion-collection-card-body">
          <CardTitle
            schema={titleSchema}
            value={titleValue}
            block={block}
            collection={collection}
          />

          <CardProperties
            block={block}
            collection={collection}
            properties={renderableProperties}
          />
        </div>
      </components.pageLink>
    </NotionContextProvider>
  );
};

interface CardTitleProps
  extends Pick<CollectionCardProps, "collection" | "block"> {
  value?: Formats.Decoration[];
  propertyTitle?: string;
  schema: Collections.PropertySchema;
}

const CardTitle: Presenter<CardTitleProps> = ({
  schema,
  value,
  block,
  collection,
}) => {
  return (
    <CardPropertyWrapper>
      <components.property
        schema={schema}
        data={value}
        block={block}
        collection={collection}
      />
    </CardPropertyWrapper>
  );
};

const CardPropertyWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="notion-collection-card-property">{children}</div>;
};

interface CardPropertiesProps {
  properties: CollectionCardProperty[];
  block: Notion.PageBlock;
  collection: Notion.Collection;
}

const CardProperties: Presenter<CardPropertiesProps> = ({
  properties,
  block,
  collection,
}) => {
  if (properties.length < 1 || !block.properties) {
    return <></>;
  }

  return (
    <>
      {properties.map((prop) => {
        <CardProperty block={block} collection={collection} property={prop} />;
      })}
    </>
  );
};

interface CardPropertyProps
  extends Pick<CardPropertiesProps, "block" | "collection"> {
  property: CollectionCardProperty;
}

const CardProperty: Presenter<CardPropertyProps> = ({
  block,
  collection,
  property,
}) => {
  const schema = collection.schema[property.property];
  const data = (block.properties as any)[property.property];

  return (
    <CardPropertyWrapper key={property.property}>
      <Property
        schema={schema}
        data={data}
        block={block}
        collection={collection}
        inline
      />
    </CardPropertyWrapper>
  );
};

function getRenderableProperties(
  collection: Notion.Collection,
  properties: CollectionCardProperty[]
): CollectionCardProperty[] {
  return properties.filter((prop) => {
    const isTitle = prop.property === "title";
    const isVisible = prop.visible;
    const isInSchema = collection.schema[prop.property];

    return !isTitle && isVisible && isInSchema;
  });
}
