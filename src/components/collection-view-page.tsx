import React from "react";
import { CollectionViewPageBlock } from "notion-types";
import { cs } from "../utils";

import { NotionContainer, NotionContainerProps } from "./notion-container";

import { useNotionContext } from "../context";

interface CollectionViewPageProps {
  block: CollectionViewPageBlock;
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

export const CollectionViewPage = (props: CollectionViewPageProps) => {
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

const FullPage = (props: CollectionViewPageProps) => {
  const {
    components,
    defaultPageIcon,
    defaultPageCover,
    defaultPageCoverPosition,
    recordMap,
    darkMode,
  } = useNotionContext();

  const { block, children, className, pageHeader, pageFooter, pageCover } =
    props;

  const {
    page_icon = defaultPageIcon,
    page_cover = defaultPageCover,
    page_cover_position = defaultPageCoverPosition,
  } = block.format || {};

  const properties = {
    title: recordMap.collection[block.collection_id]?.value?.name,
  };

  const containerParams: NotionContainerProps = {
    ...props,
    darkMode,
    className: className ?? "",
    pageCover: pageCover || page_cover,
    pageCoverPosition: page_cover_position,
  };

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

      <components.collection block={block} />

      <div className="notion-page-content">
        <article className="notion-page-content-inner">{children}</article>
      </div>

      {pageFooter}
    </NotionContainer>
  );
};

const LightPage = (props: CollectionViewPageProps) => {
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
      {pageHeader}
      {block.parent_table === "collection" && (
        <components.collectionRow block={block} />
      )}
      <components.collection block={block} />
      {children}
      {pageFooter}
    </main>
  );
};
