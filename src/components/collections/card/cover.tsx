import React from "react";

import { Formats, API, Collections, Components } from "@types";
import { useNotionContext } from "@context";
import { PageBlock, ImageBlock } from "@entities";

type CoverImageProps = Pick<WithContentProps, "coverAspect"> & {
  block: ImageBlock;
};

type WithContentProps = Pick<Props, "block" | "coverAspect">;

type WithImageProps = Pick<
  Props,
  "block" | "coverAspect" | "coverUrl" | "coverPosition"
>;

type WithPropertyProps = Pick<
  Props,
  | "block"
  | "cover"
  | "coverAspect"
  | "coverUrl"
  | "coverPosition"
  | "collection"
>;

export type Props = {
  block: PageBlock;
  collection: Collections.Collection;
  cover: Collections.Card.Cover;
  coverAspect: Collections.Card.CoverAspect;
  coverPosition: number;
  coverUrl: string;
};

export const Cover: Components.Presenter<Props> = (props) => {
  const { cover } = props;
  const { type } = cover;

  switch (type) {
    case "page_content":
      return <CardCoverWithContent {...props} />;
    case "page_cover":
      return <CardCoverWithImage {...props} />;
    case "property":
      return <CardCoverWithProperty {...props} />;
    case "file":
      // TODO
      return <></>;
    default:
      throw new Error(`Missing cover presenter for ${type}`);
  }
};

const CardCoverWithContent: Components.Presenter<WithContentProps> = ({
  block,
  coverAspect,
}) => {
  const { recordMap } = useNotionContext();
  const contentBlockId = findFirstImage(block, recordMap);

  if (!contentBlockId) return <CardCoverEmpty />;

  const contentBlock = new ImageBlock(recordMap.block[contentBlockId].value);

  return <CardCoverImage block={contentBlock} coverAspect={coverAspect} />;
};

const CardCoverWithImage: Components.Presenter<WithImageProps> = ({
  block,
  coverAspect,
  coverUrl,
  coverPosition,
}) => {
  const { mapImageUrl, components } = useNotionContext();
  const title = block.title.isEmpty
    ? "Background cover image for card"
    : block.title.asString;

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

const CardCoverWithProperty: Components.Presenter<WithPropertyProps> = ({
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
  const data = block.fetchProperty(property);

  if (!data) return <></>;

  function isFile(d: unknown): d is Formats.Decoration[] {
    return Array.isArray(d) && d.length > 1;
  }

  if (schema && isFile(data)) {
    if (schema.type === "file") {
      const files = data
        .filter((v) => v.length === 2)
        .map((f) => f.flat().flat());
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
      return <components.property {...{ block, collection, schema, data }} />;
    }
  }

  return <></>;
};

const CardCoverEmpty = (): React.ReactElement => {
  return <div className="notion-collection-card-cover-empty" />;
};

const CardCoverImage: Components.Presenter<CoverImageProps> = ({
  block,
  coverAspect,
}) => {
  const { components, mapImageUrl } = useNotionContext();
  const { displaySource: source } = block;

  if (source.length === 0) return <CardCoverEmpty />;

  const src = mapImageUrl(source, block);
  const caption = block.caption.isEmpty
    ? [["Background cover image for card"]]
    : block.caption.asString;
  const style = coverAspect ? { objectFit: coverAspect } : {};

  return <components.lazyImage src={src} alt={caption[0][0]} style={style} />;
};

const findFirstImage = (block: PageBlock, recordMap: API.ExtendedRecordMap) => {
  if (!block.content.length) return null;

  return block.content.find((blockId: string) => {
    const foundBlock = recordMap.block[blockId]?.value;

    if (foundBlock?.type === "image") {
      return true;
    } else {
      return false;
    }
  });
};
