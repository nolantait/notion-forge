import React from "react";

import { useNotionContext } from "@context";
import { cs } from "@utils";
import { View } from "@types";
import { Decorated } from "@entities";
import { Entity as BookmarkBlock } from "./";
import { Link } from "@components";

const getTitle = (block: BookmarkBlock): string => {
  const rawTitle = block.title
    .then((t) =>
      t.asString.length
        ? t
        : block.link.getOrElse(block.caption.getOrElse(new Decorated()))
    )
    .getOrElse(new Decorated());

  let title = rawTitle.asString;

  if (title.startsWith("http")) {
    try {
      title = new URL(title).hostname;
    } catch (err) {
      // ignore if invalid link
    }
  }

  return title;
};

export type Props = {
  block: BookmarkBlock;
  className?: string;
};

export const BookmarkComponent: View.Component<Props> = ({
  block,
  className,
}) => {
  const { components } = useNotionContext();

  const containerStyle = cs(
    "notion-bookmark",
    `notion-${block.blockColor.getOrElse("transparent")}`,
    className
  );

  const empty = new Decorated();
  const link = block.link.getOrElse(empty);
  const href = link.asString;
  const bookmarkTitle = block.title.getOrElse(empty);
  const bookmarkIcon = block.bookmarkIcon.getOrElse("");
  const bookmarkCover = block.bookmarkCover.getOrElse("");
  const description = block.description.getOrElse(empty);
  const title = getTitle(block);
  const caption = block.caption.getOrElse(empty);

  return (
    <>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        className={containerStyle}
        href={href}
      >
        <div>
          {bookmarkTitle.asString.length && (
            <div className="notion-bookmark-title">
              <components.text value={bookmarkTitle} block={block} />
            </div>
          )}

          {description.asString.length && (
            <div className="notion-bookmark-description">
              <components.text value={description} block={block} />
            </div>
          )}

          <div className="notion-bookmark-link">
            {bookmarkIcon.length && (
              <components.image src={bookmarkIcon} alt={title} loading="lazy" />
            )}

            <div>
              <components.text value={link} block={block} />
            </div>
          </div>
        </div>

        {bookmarkCover.length && (
          <div className="notion-bookmark-image">
            <components.image src={bookmarkCover} alt={title} loading="lazy" />
          </div>
        )}
      </Link>

      {caption.asString.length && (
        <div className="notion-bookmark-caption">
          <components.text value={caption} block={block} />
        </div>
      )}
    </>
  );
};
