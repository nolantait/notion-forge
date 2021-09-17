import React from "react";
import { cs } from "@utils";

import { NotionContainer } from "./notion-container";
import { useNotionContext } from "@context";
import { PagePresenter } from "@types";

export const Page: PagePresenter = ({ block, level, blockId }) => {
  const { fullPage } = useNotionContext();

  // Render a page link instead of a page if this is a nested block
  const PageRenderer = fullPage ? FullPage : LightPage;
  const Content = level > 0 ? PageLink : PageRenderer;

  return (
    <NotionContainer {...{ block, blockId }}>
      <Content {...{ block, blockId, level }} />
    </NotionContainer>
  );
};

const RenderContent: PagePresenter = ({ block, children, blockId }) => {
  const { components } = useNotionContext();
  const isCollection = block.type === "collection_view_page";

  return (
    <>
      {isCollection && (
        <components.collection block={block} blockId={blockId} />
      )}
      {children}
    </>
  );
};

const FullPage: PagePresenter = ({
  block,
  blockId,
  level,
  children,
  pageHeader,
  pageFooter,
  pageAside,
}) => {
  const { components, defaultPageIcon } = useNotionContext();
  const { title } = block.properties ?? { title: [[""]] };

  const {
    page_icon: pageIcon = defaultPageIcon,
    page_full_width: pageFullWidth = false,
  } = block.format;

  const hasAside = (pageAside ?? false) && !pageFullWidth;

  const containerStyle = cs(
    "notion-page-content",
    hasAside && "notion-page-content-has-aside"
  );

  return (
    <>
      {pageIcon && (
        <div className="notion-page-icon-wrapper">
          <components.pageIcon block={block} defaultIcon={defaultPageIcon} />
        </div>
      )}

      {pageHeader}

      <components.title value={title} block={block} />

      <div className={containerStyle}>
        <article className="notion-page-content-inner">
          <RenderContent
            {...{ blockId, level, block, pageHeader, pageFooter, pageAside }}
          >
            {children}
          </RenderContent>
        </article>

        {hasAside && <aside className="notion-aside">{pageAside}</aside>}
      </div>

      {pageFooter}
    </>
  );
};

const LightPage: PagePresenter = ({
  block,
  blockId,
  level,
  children,
  pageHeader,
  pageFooter,
}) => {
  return (
    <>
      {pageHeader}
      <RenderContent {...{ block, blockId, level, pageHeader, pageFooter }}>
        {children}
      </RenderContent>
      {pageFooter}
    </>
  );
};

const PageLink: PagePresenter = ({ blockId, block }) => {
  const { components, mapPageUrl } = useNotionContext();
  const blockColor = block.format?.block_color;
  const pageLinkStyle = cs(
    "notion-page-link",
    blockColor && `notion-${blockColor}`,
    blockId
  );

  return (
    <components.pageLink className={pageLinkStyle} href={mapPageUrl(block.id)}>
      <components.pageTitle block={block} />
    </components.pageLink>
  );
};
