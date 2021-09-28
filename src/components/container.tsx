import React from "react";

import { Components } from "@types";
import { PageBlock, CollectionViewPageBlock, Decorated } from "@entities";
import { useNotionContext } from "@context";
import { cs, isUrl } from "@utils";
import { PageHeader } from "@components";

export type Props = {
  block: PageBlock | CollectionViewPageBlock;
  blockId: string;
  className?: string;
  pageCover?: React.ReactNode | string;
  pageCoverPosition?: number;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

export const Component: Components.Presenter<Props> = (props) => {
  const { recordMap, defaultPageIcon, components } = useNotionContext();

  const {
    block,
    pageCover,
    footer,
    blockId,
    className,
    pageCoverPosition = 0.5,
    children,
  } = props;

  const hasPageCover = pageCover;
  const coverPosition = (1 - pageCoverPosition) * 100;
  const pageIcon = block.pageIcon.getOrElse(defaultPageIcon);
  const isPageIconUrl = pageIcon && isUrl(pageIcon);

  const outerContainerStyle = cs("notion", "notion-app", blockId, className);

  const innerContainerStyle = cs(
    "notion-page",
    hasPageCover ? "notion-page-has-cover" : "notion-page-no-cover",
    pageIcon ? "notion-page-has-icon" : "notion-page-no-icon",
    isPageIconUrl ? "notion-page-has-image-icon" : "notion-page-has-text-icon",
    block.pageFullWidth
      .then((value) => value && "notion-full-width")
      .getOrElse("")
  );

  const renderPageCover =
    typeof pageCover !== "string" ? (
      pageCover
    ) : (
      <components.image
        src={recordMap.mapImageUrl(pageCover, block)}
        alt={block.title.getOrElse(new Decorated()).asString}
        className="notion-page-cover"
        style={{
          objectPosition: `center ${coverPosition}%`,
        }}
      />
    );

  return (
    <div className={outerContainerStyle}>
      <div className="notion-frame">
        <PageHeader />

        <div className="notion-page-scroller">
          {hasPageCover ? renderPageCover : null}

          <main className={innerContainerStyle}>{children}</main>

          {footer}
        </div>
      </div>
    </div>
  );
};
