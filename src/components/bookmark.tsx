import React from "react";
import { BookmarkBlock } from "notion-types";
import { cs } from "../utils";
import { useNotionContext } from "../context";
import { GracefulImage } from "../components/graceful-image";

import { getTextContent } from "notion-utils";

interface BookmarkProps {
  blockId: string;
  block: BookmarkBlock;
}

export const Bookmark = (props: BookmarkProps) => {
  const { block, blockId } = props;
  const { components } = useNotionContext();

  if (!block.properties) return null;

  let title = getTextContent(block.properties?.title);
  if (!title) {
    title = getTextContent(block.properties?.link);
  }

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
    <div className="notion-row">
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
              <GracefulImage
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
            <GracefulImage
              src={block.format?.bookmark_cover}
              alt={getTextContent(block.properties?.title)}
              loading="lazy"
            />
          </div>
        )}
      </components.link>
    </div>
  );
};
