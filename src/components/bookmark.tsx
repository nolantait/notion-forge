import React from "react";
import { Decoration, BaseBlock } from "notion-types";
import { cs } from "../utils";
import { useNotionContext } from "../context";

import { getTextContent } from "notion-utils";

interface BookmarkProps {
  blockId: string;
  block: BookmarkBlock;
}

interface BookmarkBlock extends BaseBlock {
  type: "bookmark";
  properties: {
    link: Decoration[];
    title: Decoration[];
    description: Decoration[];
    caption?: Decoration[];
  };

  format: {
    block_color?: string;
    bookmark_icon: string;
    bookmark_cover: string;
  };
}

export const Bookmark = (props: BookmarkProps) => {
  const { block, blockId } = props;
  const { components } = useNotionContext();
  const { properties } = block;

  if (!properties) return null;

  let title = getTextContent(properties.title);
  if (!title) {
    title = getTextContent(properties.link);
  }

  const caption = properties.caption ? (
    <components.text value={properties.caption} block={block} />
  ) : null;

  if (title) {
    if (title.startsWith("http")) {
      try {
        const url = new URL(title);
        title = url.hostname;
      } catch (err) {
        // ignore invalid links
      }
    }
  }

  return (
    <>
      <components.link
        target="_blank"
        rel="noopener noreferrer"
        className={cs(
          "notion-bookmark",
          block.format?.block_color && `notion-${block.format.block_color}`,
          blockId
        )}
        href={block.properties.link[0][0]}
      >
        <div>
          {title && (
            <div className="notion-bookmark-title">
              <components.text value={[[title]]} block={block} />
            </div>
          )}

          {block.properties?.description && (
            <div className="notion-bookmark-description">
              <components.text
                value={block.properties?.description}
                block={block}
              />
            </div>
          )}

          <div className="notion-bookmark-link">
            {block.format?.bookmark_icon && (
              <components.image
                src={block.format?.bookmark_icon}
                alt={title}
                loading="lazy"
              />
            )}

            <div>
              <components.text value={block.properties?.link} block={block} />
            </div>
          </div>
        </div>

        {block.format?.bookmark_cover && (
          <div className="notion-bookmark-image">
            <components.image
              src={block.format?.bookmark_cover}
              alt={getTextContent(block.properties?.title)}
              loading="lazy"
            />
          </div>
        )}
      </components.link>

      {caption && <div className="notion-bookmark-caption">{caption}</div>}
    </>
  );
};
