import { useNotionContext } from "@context";
import { cs } from "@utils";
import { Components } from "@types";
import { Decorated, BookmarkBlock } from "@entities";

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

export const BookmarkComponent: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { components } = useNotionContext();
  const { bookmarkCover, bookmarkIcon } = block;
  const title = getTitle(block);

  const containerStyle = cs(
    "notion-bookmark",
    `notion-${block.blockColor.getOrElse("transparent")}`,
    className
  );

  return (
    <>
      <components.link
        target="_blank"
        rel="noopener noreferrer"
        className={containerStyle}
        href={link.asString}
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
              <components.image
                src={bookmarkIcon}
                alt={title.asString}
                loading="lazy"
              />
            )}

            <div>
              <components.text value={link} block={block} />
            </div>
          </div>
        </div>

        {bookmarkCover.length && (
          <div className="notion-bookmark-image">
            <components.image
              src={bookmarkCover}
              alt={title.asString}
              loading="lazy"
            />
          </div>
        )}
      </components.link>

      {caption.asString.length && (
        <div className="notion-bookmark-caption">
          <components.text value={caption} block={block} />
        </div>
      )}
    </>
  );
};
