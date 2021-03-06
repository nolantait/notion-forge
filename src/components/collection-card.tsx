import React from "react";
import {
  ImageBlock,
  PageBlock,
  CollectionCardCoverAspect,
  CollectionCardCover,
  Collection,
} from "notion-types";
import { getTextContent } from "notion-utils";

import { CollectionCardProps } from "../types";
import { Property } from "./property";
import { useNotionContext, dummyLink, NotionContextProvider } from "../context";

import { cs } from "../utils";

function findFirstImage(block: PageBlock) {
  const { recordMap } = useNotionContext();
  const { content } = block;

  if (!content) return null;

  return content.find((blockId) => {
    const foundBlock = recordMap.block[blockId]?.value;

    if (foundBlock?.type === "image") {
      return true;
    } else {
      return false;
    }
  });
}

const PageContent = (
  block: PageBlock,
  coverAspect: CollectionCardCoverAspect
) => {
  const { recordMap, mapImageUrl, components } = useNotionContext();
  const contentBlockId = findFirstImage(block);

  if (contentBlockId) {
    const contentBlock = recordMap.block[contentBlockId]?.value as ImageBlock;

    const source =
      contentBlock.properties?.source?.[0]?.[0] ??
      contentBlock.format?.display_source;

    if (source) {
      const src = mapImageUrl(source, contentBlock);
      const caption = contentBlock.properties?.caption?.[0]?.[0];

      return (
        <components.lazyImage
          src={src}
          alt={caption || "notion image"}
          style={{
            objectFit: coverAspect,
          }}
        />
      );
    }
  }

  return <div className="notion-collection-card-cover-empty" />;
};

const PageCover = (
  block: PageBlock,
  coverAspect: CollectionCardCoverAspect
) => {
  const { mapImageUrl, components } = useNotionContext();
  const { page_cover, page_cover_position = 0.5 } = block.format || {};

  if (page_cover) {
    const coverPosition = (1 - page_cover_position) * 100;

    return (
      <components.lazyImage
        src={mapImageUrl(page_cover, block)}
        alt={getTextContent(block.properties?.title)}
        style={{
          objectFit: coverAspect,
          objectPosition: `center ${coverPosition}%`,
        }}
      />
    );
  }

  return null;
};

const PropertyCover = (
  block: PageBlock,
  collection: Collection,
  cover: CollectionCardCover,
  coverAspect: CollectionCardCoverAspect
) => {
  const { mapImageUrl, components } = useNotionContext();

  const { page_cover_position = 0.5 } = block.format || {};
  const coverPosition = (1 - page_cover_position) * 100;

  const { property } = cover;

  if (!property) return null;
  const schema = collection.schema[property];
  const data = (block as any).properties?.[property];

  if (schema && data) {
    if (schema.type === "file") {
      const files = data
        .filter((v: any) => v.length === 2)
        .map((f: any) => f.flat().flat());
      const file = files[0];

      if (file) {
        return (
          <span className={`notion-property-${schema.type}`}>
            <components.lazyImage
              alt={file[0] as string}
              src={mapImageUrl(file[2] as string, block)}
              style={{
                objectFit: coverAspect,
                objectPosition: `center ${coverPosition}%`,
              }}
            />
          </span>
        );
      }
    } else {
      return <Property schema={schema} data={data} />;
    }
  }

  return null;
};

export const CollectionCard: React.FC<CollectionCardProps> = (
  props: CollectionCardProps
) => {
  const {
    collection,
    block,
    cover,
    coverSize,
    coverAspect,
    properties,
    className,
    ...rest
  } = props;

  const context = useNotionContext();
  const { components, mapPageUrl } = context;
  let coverContent = null;

  if (cover?.type === "page_content") {
    coverContent = PageContent(block, coverAspect);
  } else if (cover?.type === "page_cover") {
    coverContent = PageCover(block, coverAspect);
  } else if (cover?.type === "property") {
    coverContent = PropertyCover(block, collection, cover, coverAspect);
  }

  return (
    <NotionContextProvider
      {...context}
      components={{
        ...context.components,
        // Disable <a> tabs in all child components so we don't create invalid DOM
        // trees with stacked <a> tags.
        link: dummyLink,
        pageLink: dummyLink,
      }}
    >
      <components.pageLink
        className={cs(
          "notion-collection-card",
          `notion-collection-card-size-${coverSize}`,
          className
        )}
        href={mapPageUrl(block.id)}
        {...rest}
      >
        {(coverContent || cover?.type !== "none") && (
          <div className="notion-collection-card-cover">{coverContent}</div>
        )}

        <div className="notion-collection-card-body">
          <div className="notion-collection-card-property">
            <Property
              schema={collection.schema.title}
              data={block?.properties?.title}
              block={block}
              collection={collection}
            />
          </div>

          {properties
            ?.filter(
              (p) =>
                p.visible &&
                p.property !== "title" &&
                collection.schema[p.property]
            )
            .map((p) => {
              if (!block.properties) return null;
              const schema = collection.schema[p.property];
              const data = (block.properties as any)[p.property];

              return (
                <div
                  className="notion-collection-card-property"
                  key={p.property}
                >
                  <Property
                    schema={schema}
                    data={data}
                    block={block}
                    collection={collection}
                    inline
                  />
                </div>
              );
            })}
        </div>
      </components.pageLink>
    </NotionContextProvider>
  );
};
