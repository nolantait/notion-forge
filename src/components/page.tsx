import React from "react";
import { PageBlock } from "notion-types";
import { cs } from "../utils";

import { NotionContainer } from "./notion-container";

import { getPageTableOfContents } from "notion-utils";
import { useNotionContext } from "../context";

interface PageProps {
  block: PageBlock;
  blockId: string;
  children: React.ReactNode;
  level: number;
  bodyClassName: string;
  footer: React.ReactNode;
  className?: string;
  pageHeader: React.ReactNode;
  pageFooter: React.ReactNode;
  pageAside: React.ReactNode;
  pageCover: React.ReactNode;
}

export const Page = (props: PageProps) => {
  const { components, mapPageUrl, fullPage } = useNotionContext();
  const { block, level, blockId } = props;

  if (level === 0) {
    if (fullPage) {
      return FullPage(props);
    } else {
      return LightPage(props);
    }
  } else {
    const blockColor = block.format?.block_color;
    const pageLinkStyle = cs(
      "notion-page-link",
      blockColor && `notion-${blockColor}`,
      blockId
    );

    return (
      <components.pageLink
        className={pageLinkStyle}
        href={mapPageUrl(block.id)}
      >
        <components.pageTitle block={block} />
      </components.pageLink>
    );
  }
};

const FullPage = (props: PageProps) => {
  const {
    components,
    defaultPageIcon,
    defaultPageCover,
    defaultPageCoverPosition,
    recordMap,
    showTableOfContents,
    minTableOfContentsItems,
    darkMode,
  } = useNotionContext();

  const {
    block,
    children,
    className,
    bodyClassName,
    footer,
    pageHeader,
    pageFooter,
    pageAside,
    pageCover,
    blockId,
  } = props;

  const {
    page_icon = defaultPageIcon,
    page_cover = defaultPageCover,
    page_cover_position = defaultPageCoverPosition,
    page_full_width,
  } = block.format || {};

  const { properties } = block;

  const toc = getPageTableOfContents(block, recordMap);
  const hasToc = showTableOfContents && toc.length >= minTableOfContentsItems;
  const hasAside = (hasToc || pageAside) && !page_full_width;

  const containerParams = {
    block,
    darkMode,
    blockId,
    className,
    pageCover: pageCover || page_cover,
    pageCoverPosition: page_cover_position,
    footer,
    bodyClassName,
  };

  const tableOfContentsStyle = cs(
    "notion-page-content",
    hasAside && "notion-page-content-has-aside",
    hasToc && "notion-page-content-has-toc"
  );

  const parentIsCollection = block.parent_table === "collection";

  return (
    <NotionContainer {...containerParams}>
      {page_icon && (
        <div className="notion-page-icon-wrapper">
          <components.pageIcon block={block} defaultIcon={defaultPageIcon} />
        </div>
      )}

      {pageHeader}

      <components.title value={properties?.title} block={block} />

      {parentIsCollection && <components.collectionRow block={block} />}

      <div className={tableOfContentsStyle}>
        <article className="notion-page-content-inner">{children}</article>

        {hasAside && (
          <aside className="notion-aside">
            {hasToc && <components.tableOfContents block={block} />}
            {pageAside}
          </aside>
        )}
      </div>

      {pageFooter}
    </NotionContainer>
  );
};

const LightPage = (props: PageProps) => {
  const { components, darkMode } = useNotionContext();

  const {
    block,
    children,
    className,
    bodyClassName,
    pageHeader,
    pageFooter,
    blockId,
  } = props;

  const { page_full_width, page_small_text } = block.format || {};

  const containerStyle = cs(
    "notion",
    darkMode ? "dark-mode" : "light-mode",
    "notion-page",
    page_full_width && "notion-full-width",
    page_small_text && "notion-small-text",
    blockId,
    className,
    bodyClassName
  );

  return (
    <main className={containerStyle}>
      <div className="notion-viewport" />
      {pageHeader}
      {block.type === "page" && block.parent_table === "collection" && (
        <components.collectionRow block={block} />
      )}
      {children}
      {pageFooter}
    </main>
  );
};
