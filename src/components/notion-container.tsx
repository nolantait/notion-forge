import React from "react";
import { cs, isUrl } from "../utils";

import { PageBlock, CollectionViewPageBlock } from "notion-types";

import { useNotionContext } from "../context";
import { getBlockIcon, getTextContent } from "notion-utils";

export interface NotionContainerProps {
  block: PageBlock | CollectionViewPageBlock;
  darkMode: boolean;
  blockId: string;
  className: string;
  bodyClassName: string;
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
    darkMode,
    blockId,
    className,
    pageCoverPosition,
    children,
    bodyClassName,
  } = props;

  const { properties } = block;
  const hasPageCover = pageCover;
  const coverPosition = (1 - (pageCoverPosition || 0.5)) * 100;
  const pageIcon = getBlockIcon(block, recordMap) ?? defaultPageIcon;
  const isPageIconUrl = pageIcon && isUrl(pageIcon);

  const outerContainerStyle = cs(
    "notion",
    "notion-app",
    darkMode ? "dark-mode" : "light-mode",
    blockId,
    className
  );

  const innerContainerStyle = cs(
    "notion-page",
    hasPageCover ? "notion-page-has-cover" : "notion-page-no-cover",
    pageIcon ? "notion-page-has-icon" : "notion-page-no-icon",
    isPageIconUrl ? "notion-page-has-image-icon" : "notion-page-has-text-icon",
    "notion-full-page",
    bodyClassName
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
