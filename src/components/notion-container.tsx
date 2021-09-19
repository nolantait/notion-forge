import React from "react";

import { PageBlock, CollectionViewPageBlock } from "@types";
import { useNotionContext } from "@context";
import { cs, isUrl, getBlockIcon, getTextContent } from "@utils";

interface NotionContainerProps {
  block: PageBlock | CollectionViewPageBlock;
  blockId: string;
  className?: string;
  pageCover?: React.ReactNode | string;
  pageCoverPosition?: number;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const NotionContainer = (props: NotionContainerProps) => {
  const { mapImageUrl, defaultPageIcon, recordMap, components } =
    useNotionContext();

  const {
    block,
    pageCover,
    footer,
    blockId,
    className,
    pageCoverPosition = 0.5,
    children,
  } = props;

  const { properties } = block;
  const hasPageCover = pageCover;
  const coverPosition = (1 - pageCoverPosition) * 100;
  const pageIcon = getBlockIcon(block, recordMap) ?? defaultPageIcon;
  const isPageIconUrl = pageIcon && isUrl(pageIcon);
  const { page_full_width: pageFullWidth = false } = block?.format ?? {};

  const outerContainerStyle = cs("notion", "notion-app", blockId, className);

  const innerContainerStyle = cs(
    "notion-page",
    hasPageCover ? "notion-page-has-cover" : "notion-page-no-cover",
    pageIcon ? "notion-page-has-icon" : "notion-page-no-icon",
    isPageIconUrl ? "notion-page-has-image-icon" : "notion-page-has-text-icon",
    pageFullWidth && "notion-full-width"
  );

  const renderPageCover =
    typeof pageCover !== "string" ? (
      pageCover
    ) : (
      <components.lazyImage
        src={mapImageUrl(pageCover, block)}
        alt={getTextContent(properties?.title)}
        className="notion-page-cover"
        style={{
          objectPosition: `center ${coverPosition}%`,
        }}
      />
    );

  return (
    <div className={outerContainerStyle}>
      <div className="notion-frame">
        <components.pageHeader />

        <div className="notion-page-scroller">
          {hasPageCover ? renderPageCover : null}

          <main className={innerContainerStyle}>{children}</main>

          {footer}
        </div>
      </div>
    </div>
  );
};
