import React from "react";

import { getTextContent } from "@utils";
import { Notion, CardCoverProps, Presenter } from "@types";
import { useNotionContext } from "@context";
import { Property } from "@components/property";

interface CardCoverImageProps
  extends Pick<CardCoverWithContentProps, "coverAspect"> {
  block: Notion.ImageBlock;
}

interface CardCoverWithContentProps
  extends Pick<CardCoverProps, "block" | "coverAspect"> {}

interface CardCoverWithImageProps
  extends Pick<
    CardCoverProps,
    "block" | "coverAspect" | "coverUrl" | "coverPosition"
  > {}

interface CardCoverWithPropertyProps
  extends Pick<
    CardCoverProps,
    | "block"
    | "cover"
    | "coverAspect"
    | "coverUrl"
    | "coverPosition"
    | "collection"
  > {}

export const CardCover: Presenter<CardCoverProps> = (props) => {
  const { cover } = props;
  const { type } = cover;

  switch (type) {
    case "page_content":
      return <CardCoverWithContent {...props} />;
    case "page_cover":
      return <CardCoverWithImage {...props} />;
    case "property":
      return <CardCoverWithProperty {...props} />;
    default:
      throw new Error(`Missing cover presenter for ${type}`);
  }
};

const CardCoverWithContent: Presenter<CardCoverWithContentProps> = ({
  block,
  coverAspect,
}) => {
  const { recordMap } = useNotionContext();
  const contentBlockId = findFirstImage(block);

  if (!contentBlockId) return <CardCoverEmpty />;

  const contentBlock = recordMap.block[contentBlockId]
    .value as Notion.ImageBlock;

  return <CardCoverImage block={contentBlock} coverAspect={coverAspect} />;
};

const CardCoverWithImage: Presenter<CardCoverWithImageProps> = ({
  block,
  coverAspect,
  coverUrl,
  coverPosition,
}) => {
  const { mapImageUrl, components } = useNotionContext();
  const blockTitleProperty = block.properties?.title;
  const title =
    getTextContent(blockTitleProperty) ?? "Background cover image for card";

  if (!coverUrl) return <></>;

  return (
    <components.lazyImage
      src={mapImageUrl(coverUrl, block)}
      alt={title}
      style={{
        objectFit: coverAspect,
        objectPosition: `center ${coverPosition}%`,
      }}
    />
  );
};

const CardCoverWithProperty: Presenter<CardCoverWithPropertyProps> = ({
  block,
  collection,
  cover,
  coverAspect,
  coverPosition,
}) => {
  const { mapImageUrl, components } = useNotionContext();
  const { property } = cover;

  if (!property) return <></>;
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
      return <Property {...{ block, collection, schema, data }} />;
    }
  }

  return <></>;
};

const CardCoverEmpty = (): React.ReactElement => {
  return <div className="notion-collection-card-cover-empty" />;
};

const CardCoverImage: Presenter<CardCoverImageProps> = ({
  block,
  coverAspect,
}) => {
  const { components, mapImageUrl } = useNotionContext();
  const { format, properties } = block;
  const source = format?.display_source;

  if (!source) return <CardCoverEmpty />;

  const src = mapImageUrl(source, block);
  const caption = properties.caption ?? [["Background cover image for card"]];
  const style = coverAspect ? { objectFit: coverAspect } : {};

  return <components.lazyImage src={src} alt={caption[0][0]} style={style} />;
};

const findFirstImage = (block: Notion.PageBlock) => {
  const { recordMap } = useNotionContext();
  const { content } = block;

  if (!content) return null;

  return content.find((blockId: string) => {
    const foundBlock = recordMap.block[blockId]?.value;

    if (foundBlock?.type === "image") {
      return true;
    } else {
      return false;
    }
  });
};
