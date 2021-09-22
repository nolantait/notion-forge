import React from "react";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { Components } from "@types";
import { Decorated, BookmarkBlock } from "@entities";

export type Props = {
  block: BookmarkBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { components } = useNotionContext();
  const { blockColor, description, caption, link, title } = block;
  const blockTitle = block.title.asString;
  const titleText = blockTitle.length
    ? blockTitle
    : link.asString.length
    ? link.asString
    : caption.asString;
  const bookmarkTitle = new Decorated([[formatLinkTitle(titleText)]]);
  const { bookmarkCover, bookmarkIcon } = block;

  const containerStyle = cs(
    "notion-bookmark",
    `notion-${blockColor}`,
    className
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
          {bookmarkTitle.asString.length && (
            <div className="notion-bookmark-title">
              <components.text
                value={bookmarkTitle.asDecoration}
                block={block}
              />
            </div>
          )}

          {description.asString.length && (
            <div className="notion-bookmark-description">
              <components.text value={description.asDecoration} block={block} />
            </div>
          )}

          <div className="notion-bookmark-link">
            {bookmarkIcon.length && (
              <components.image src={bookmarkIcon} alt={title} loading="lazy" />
            )}

            <div>
              <components.text value={link.asDecoration} block={block} />
            </div>
          </div>
        </div>

        {bookmarkCover.length && (
          <div className="notion-bookmark-image">
            <components.image src={bookmarkCover} alt={title} loading="lazy" />
          </div>
        )}
      </components.link>

      {caption.asString.length && (
        <div className="notion-bookmark-caption">
          <components.text value={caption.asDecoration} block={block} />
        </div>
      )}
    </>
  );
};

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
