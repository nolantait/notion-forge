import React from "react";

import { useNotionContext } from "@context";
import { cs, getTextContent } from "@utils";
import { Notion, BookmarkBlockProps, BookmarkPresenter } from "@types";

export const Bookmark: BookmarkPresenter = ({ block, blockId }) => {
  const { components } = useNotionContext();
  const { properties, format } = block;
  const { caption } = properties;

  const { hasTitle, title, decoratedTitle } = getBookmarkTitle(properties);
  const link = properties.link[0][0];

  const captionText = caption ? properties.caption : null;

  const containerStyle = cs(
    "notion-bookmark",
    block.format?.block_color && `notion-${block.format.block_color}`,
    blockId
  );

  return (
    <>
      <components.link
        target="_blank"
        rel="noopener noreferrer"
        className={containerStyle}
        href={link}
      >
        <div>
          {hasTitle && (
            <div className="notion-bookmark-title">
              <components.text value={decoratedTitle} block={block} />
            </div>
          )}

          {block.properties?.description && (
            <div className="notion-bookmark-description">
              <components.text value={properties.description} block={block} />
            </div>
          )}

          <div className="notion-bookmark-link">
            {format.bookmark_icon && (
              <components.image
                src={format.bookmark_icon}
                alt={title}
                loading="lazy"
              />
            )}

            <div>
              <components.text value={properties.link} block={block} />
            </div>
          </div>
        </div>

        {format.bookmark_cover && (
          <div className="notion-bookmark-image">
            <components.image
              src={format.bookmark_cover}
              alt={title}
              loading="lazy"
            />
          </div>
        )}
      </components.link>

      {captionText && (
        <div className="notion-bookmark-caption">
          <components.text value={captionText} block={block} />
        </div>
      )}
    </>
  );
};

function getBookmarkTitle(properties: BookmarkBlockProps): {
  decoratedTitle: Notion.Decoration[];
  title: string;
  hasTitle: boolean;
} {
  const linkProperty = getTextContent(properties.link);
  const titleProperty = getTextContent(properties.title);
  const rawTitle = titleProperty ?? linkProperty ?? "";
  const title = formatLinkTitle(rawTitle);
  const decoratedTitle: Notion.Decoration[] = [[title]];
  const hasTitle = title.length > 0;

  return { decoratedTitle, title, hasTitle };
}

const formatLinkTitle = (title: string): string => {
  if (title.startsWith("http")) {
    try {
      return new URL(title).hostname;
    } catch (err) {
      // ignore if invalid link
    }
  }

  return title;
};
